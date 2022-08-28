exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('email', 255).notNullable();
    table.string('password', 255).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
