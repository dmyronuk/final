
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transcriptions', function(table) {
    table.increments('id').primary();
    table.string('name', 100);
    table.integer('transcription_request_id');
    table.foreign('transcription_request_id').references('transcription_requests.id');
    table.specificType('note_data','text[]');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transcriptions');
};
