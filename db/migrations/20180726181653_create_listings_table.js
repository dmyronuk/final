
exports.up = function(knex, Promise) {
  return knex.schema.createTable('listings', function(table) {
    table.increments('id').primary();
    table.string('address');
    table.specificType('photos', 'text[]');
    table.float('price');
    table.integer('landlords_id');
    table.foreign('landlords_id').references('landlords.id')
    table.double('lng');
    table.double('lat');
    table.integer('neighbourhoods_id');
    table.foreign('neighbourhoods_id').references('neighbourhoods.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings');
};


