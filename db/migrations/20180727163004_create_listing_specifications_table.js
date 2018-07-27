
exports.up = function(knex, Promise) {
  return knex.schema.createTable('listing_specifications', function(table) {
    table.increments('id').primary();
    table.integer('bedrooms');
    table.integer('bathrooms');
    table.text('description');
    table.date('date_available');
    table.integer('listings_id');
    table.foreign('listings_id').references('listings.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listing_specifications');
};
