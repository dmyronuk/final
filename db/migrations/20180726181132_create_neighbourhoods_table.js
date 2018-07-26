
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighbourhoods', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('crime_rating', 100);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighbourhoods');
};
