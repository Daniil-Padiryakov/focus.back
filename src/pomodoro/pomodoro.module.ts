import { Module } from '@nestjs/common';
import { PomodoroController } from './pomodoro.controller';
import { PomodoroService } from './pomodoro.service';
import { DbModule } from '../db/db.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [PomodoroController],
  providers: [PomodoroService],
})
export class PomodoroModule {}
