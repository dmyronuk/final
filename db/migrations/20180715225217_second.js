
exports.up = function(knex, Promise) {
  return createStudents()
    .then(createLessons)

  function createStudents(){
    return knex.schema.createTable("students", (table) => {
      table.increments("id");
      table.string("first_name");
      table.string("last_name");
      table.integer("grade");
      table.boolean("active");
      table.decimal("hourly_rate", 8, 2);
    })
  }

  //When creating foreign key constraints you need to create the column first
  //Then in a separate statement declare the constraint as int table.integer("students_id")..... table.forgeign.....
  function createLessons(){
    return knex.schema.createTable("lessons", (table) => {
      table.increments("id");
      table.integer("student_id").unsigned();
      table.foreign("student_id").references("id").inTable("students").onDelete("CASCADE");
      table.bigInteger("time");
      table.integer("duration");
    })
  }
};

exports.down = function(knex, Promise) {
  return dropLessons()
    .then(dropStudents)

  function dropLessons(){
    return knex.schema.dropTable("lessons");
  }

  function dropStudents(){
    return knex.schema.dropTable("students");
  }
};
