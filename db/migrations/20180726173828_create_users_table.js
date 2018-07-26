
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('email');
    table.string('password_digest');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
