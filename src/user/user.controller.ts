import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.userService.registration(userDto);
  }

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.userService.login(userDto);
  }
}
