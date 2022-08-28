import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateAccessToken = (id: number) => {
    return this.jwtService.sign({ id });
  };

  generateRefreshToken = (id: number) => {
    return this.jwtService.sign(
      { id },
      {
        secret: process.env.ACCESS_KEY,
        expiresIn: '30d',
      },
    );
  };

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.ACCESS_KEY,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async registration(dto: CreateUserDto) {
    const { email, password } = dto;
    const candidate = await this.knex('user').where('email', email).first();

    if (candidate) {
      throw new HttpException(
        `Пользователь с почтовым адресом ${email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(String(password), 7);
    const [user]: any = await this.knex('user')
      .returning(['id', 'email'])
      .insert({
        email,
        password: hashPassword,
      });

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    await this.saveToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async login(dto: CreateUserDto) {
    const { email, password } = dto;
    const userInfo = await this.knex('user').where('email', email).first();

    if (!userInfo) {
      throw new HttpException(
        'Пользователь с таким email не найден',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassEquals = await bcrypt.compare(
      String(password),
      userInfo.password,
    );
    if (!isPassEquals) {
      throw new UnauthorizedException({
        message: 'Неверный пароль',
      });
    }

    const accessToken = this.generateAccessToken(userInfo.id);
    const refreshToken = this.generateRefreshToken(userInfo.id);

    await this.saveToken(userInfo.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: userInfo.id,
        email: userInfo.email,
      },
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData: any = await this.knex('token')
      .where('user_id', userId)
      .first();

    if (tokenData) {
      return this.knex('token').where('user_id', userId).update({
        refresh_token: refreshToken,
      });
    }

    return this.knex('token').insert({
      refresh_token: refreshToken,
      user_id: userId,
    });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Неверный рефреш токен',
      });
    }

    const userData = this.validateRefreshToken(refreshToken);
    const tokenData = await this.knex('token')
      .where('refresh_token', refreshToken)
      .first();

    if (!userData || !tokenData) {
      throw new UnauthorizedException({
        message: 'Неверный рефреш токен 1',
      });
    }

    const user = await this.knex('user')
      .where('id', userData.id)
      .select(['id', 'email'])
      .first();

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken1 = this.generateRefreshToken(user.id);

    await this.saveToken(user.id, refreshToken1);
    return {
      accessToken,
      refreshToken: refreshToken1,
      user,
    };
  }
}
