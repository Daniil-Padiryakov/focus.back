import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { queries } from '../db/queries/category';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async create(dto: CreateCategoryDto) {
    const { title, user_id } = dto;
    const createdCategory: any = await this.conn
      .query(queries.addCategory, [title, user_id])
      .then(async (res: any) => {
        const categoryRes: any = await this.conn
          .query(queries.getLastCategory, [user_id])
          .catch((err: Error) =>
            setImmediate(() => {
              throw err;
            }),
          );
        return categoryRes.rows[0];
      })
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return createdCategory;
  }

  async getAll(user_id: number) {
    if (!user_id) {
      throw new Error('Не был указан ID пользователя');
    }
    const allCategories: any = await this.conn
      .query(queries.getAllCategoriesByUserId, [user_id])
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return allCategories.rows;
  }

  async update(dto: UpdateCategoryDto) {
    const { id, title } = dto;
    if (!id) {
      throw new Error('Не был указан ID категории');
    }
    const updatedCategory = await this.conn
      .query(queries.updateCategory, [title, id])
      .then(async (res) => {
        const categoryRes: any = await this.conn
          .query(queries.getCategoryById, [id])
          .catch((err: Error) =>
            setImmediate(() => {
              throw err;
            }),
          );
        return categoryRes.rows[0];
      })
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return updatedCategory;
  }

  async delete(id: any) {
    if (!id) {
      throw new Error('Не был указан ID категории');
    }
    const deleteCategoryRes: any = await this.conn
      .query(queries.deleteCategoryById, [id])
      .catch((err: Error) =>
        setImmediate(() => {
          throw err;
        }),
      );
    return { rowCount: deleteCategoryRes.rowCount };
  }
}
