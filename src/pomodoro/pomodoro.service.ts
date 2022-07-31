import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import queries from '../db/queries/pomodoro';
import { CreatePomodoroDto } from './dto/create-pomodoro.dto';

@Injectable()
export class PomodoroService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async create(dto: CreatePomodoroDto) {
    const { duration, user_id, category_id } = dto;

    const createdPomodoro: any = await this.conn
      .query(queries.addPomodoro, [duration, user_id, category_id])
      .then(async (res) => {
        const pomodoroRes = await this.conn
          .query(queries.getLastPomodoro, [user_id])
          .catch((err: Error) =>
            setImmediate(() => {
              console.log('erroooooooooo');
              throw err;
            }),
          );
        return pomodoroRes.rows[0];
      })
      .catch((err) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return createdPomodoro;
  }

  async getAll(userId: number) {
    const pomodoros = await this.conn
      .query(queries.getAllPomodorosByUserId, [userId])
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return pomodoros.rows;
  }
}
