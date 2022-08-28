import { Injectable } from '@nestjs/common';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class PomodoroService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(dto: CreatePomodoroDto) {
    const { duration, user_id, category_id } = dto;

    const [createdPomodoro] = await this.knex('pomodoro')
      .returning('*')
      .insert({
        duration,
        user_id,
        category_id,
      });
    return createdPomodoro;
  }

  async getAll(userId: number) {
    return this.knex('pomodoro').where('user_id', userId);
  }
}
