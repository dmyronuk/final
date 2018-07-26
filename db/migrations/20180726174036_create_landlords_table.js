
exports.up = function(knex, Promise) {
  return knex.schema.createTable('landlords', function(table){
    table.increments('id').primary();
    table.string('phone_number', 100);
    table.integer('users_id');
    table.foreign('users_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('landlords');
};
