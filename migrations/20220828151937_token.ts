import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('token', (table) => {
    table.increments('id');
    table.string('refresh_token', 255).notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('token');
}
