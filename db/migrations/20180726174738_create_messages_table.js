
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id').primary();
    table.text('text');
    table.integer('sender');
    table.foreign('sender').references('users.id');
    table.integer('recipient');
    table.foreign('recipient').references('users.id');
    table.timestamp('created_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
