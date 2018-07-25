// careful about singular vs plural!!!

exports.up = function(knex, Promise) {
  return knex.schema.createTable('transcription_requests', function(table) {
    table.increments('id').primary();
    table.integer('student_id');
    table.foreign('student_id').references('students.id');
    table.integer('teacher_id');
    table.foreign('teacher_id').references('teachers.id');
    table.string('status', 100);
    table.string('song_title');
    table.string('song_artist', 100);
    table.string('youtube_url');
    table.timestamp('data');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transcription_requests');
};
