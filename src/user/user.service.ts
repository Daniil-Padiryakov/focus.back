import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import queries from '../db/queries/user';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(PG_CONNECTION) private conn: any,
    private jwtService: JwtService,
  ) {}

  generateAccessToken = (id: number) => {
    return this.jwtService.sign({ id });
  };

  async registration(dto: CreateUserDto) {
    const { email, password } = dto;
    const candidate = await this.conn
      .query(queries.getUserByEmail, [email])
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    if (candidate.rows[0]) {
      throw new HttpException(
        `Пользователь с почтовым адресом ${email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(String(password), 7);

    const user = await this.conn
      .query(queries.addUser, [email, hashPassword])
      .then(async (res: any) => {
        const userRow = await this.conn
          .query(queries.getLastUser)
          .catch((err: Error) =>
            setImmediate(() => {
              throw err;
            }),
          );
        return userRow.rows[0];
      })
      .catch((err: Error) => {
        setImmediate(() => {
          throw err;
        });
      });
    const token = this.generateAccessToken(user.id);
    return { token };
  }

  async login(dto: CreateUserDto) {
    const { email, password } = dto;
    const user = await this.conn
      .query(queries.getUserByEmail, [email])
      .then((res) => res.rows[0])
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );

    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPassEquals = await bcrypt.compare(String(password), user.password);
    if (!isPassEquals) {
      throw new UnauthorizedException({
        message: 'Неверный пароль',
      });
    }

    const token = this.generateAccessToken(user.id);
    return { token };
  }
}
