import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pomodoro', (table) => {
    table.increments('id');
    table.integer('duration').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade');
    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('category')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pomodoro');
}
