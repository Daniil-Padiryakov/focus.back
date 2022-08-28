import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class CategoryService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(dto: CreateCategoryDto) {
    const { title, user_id } = dto;
    const [createdCategory] = await this.knex('category')
      .returning('*')
      .insert({
        title,
        user_id,
      });
    return createdCategory;
  }

  async getAll(user_id) {
    if (!user_id) {
      throw new Error('Не был указан ID пользователя');
    }
    return this.knex('category').where('user_id', user_id);
  }

  async update(dto: UpdateCategoryDto) {
    const { id, title } = dto;
    if (!id) {
      throw new Error('Не был указан ID категории');
    }
    return this.knex('category').returning('*').where('id', id).update({
      title,
    });
  }

  async delete(id: any) {
    if (!id) {
      throw new Error('Не был указан ID категории');
    }
    const idDeletedCategory: any = await this.knex('category')
      .returning('id')
      .where('id', id)
      .del();
    return idDeletedCategory;
  }
}
