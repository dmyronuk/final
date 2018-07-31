exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function(table) {
    table.increments('id').primary();
    table.integer('rating');
    table.integer('rater');
    table.integer('ratee');
    table.foreign('rater').references('users.id');
    table.foreign('ratee').references('users.id');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
