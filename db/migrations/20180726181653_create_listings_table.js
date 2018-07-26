
exports.up = function(knex, Promise) {
  return knex.schema.createTable('listings', function(table) {
    table.increments('id').primary();
    table.string('address');
    table.specificType('photos', 'text[]');
    table.bigInteger('price');
    table.integer('landlords_id');
    table.foreign('landlords_id').references('landlords.id')
    table.bigInteger('lng');
    table.bigInteger('lat');
    table.integer('neighbourhoods_id');
    table.foreign('neighbourhoods_id').references('neighbourhoods.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings');
};


