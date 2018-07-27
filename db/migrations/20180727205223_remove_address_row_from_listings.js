
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('listings', function(table) {
    table.dropColumn('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('listings', function(table) {
    table.string('address');
  });
};
