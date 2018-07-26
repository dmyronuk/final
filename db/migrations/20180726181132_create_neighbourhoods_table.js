
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighbourhoods', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('crime_rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighbourhoods');
};
