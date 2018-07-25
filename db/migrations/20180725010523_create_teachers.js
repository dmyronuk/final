
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teachers', function(table) {
    table.increments('id').primary();
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.text('profile_picture');
    table.string('email');
    table.string('password');
    table.integer('balance');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teachers');
};
