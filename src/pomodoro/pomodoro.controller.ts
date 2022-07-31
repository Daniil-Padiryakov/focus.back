import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';

@Controller('pomodoro')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Post()
  create(@Body() dto: CreatePomodoroDto) {
    return this.pomodoroService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getAll(@Param('id') id: number) {
    return this.pomodoroService.getAll(id);
  }
}
