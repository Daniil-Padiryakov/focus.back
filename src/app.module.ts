import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          port: Number(process.env.POSTGRES_PORT),
        },
      },
    }),
    UserModule,
    PomodoroModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
