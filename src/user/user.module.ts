import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '../db/db.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: 'random_secret_key123',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, JwtModule],
})
export class UserModule {}
