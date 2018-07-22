exports.seed = function(knex, Promise){

  function deleteStudents(){
    return knex("students").del();
  }

  function deleteLessons(){
    return knex("lessons").del();
  }

  function insertStudents(){
    return knex("students").insert([
      {
        first_name: "Sam",
        last_name: "Dickenson",
        grade: 8,
        active: true,
        hourly_rate: 60,
      },
      {
        first_name: "Taylor",
        last_name: "Dylan",
        grade: 7,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Beckham",
        last_name: "Segram",
        grade: 5,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Maddy",
        last_name: "Anderson",
        grade: 1,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Charlie",
        last_name: "Anderson",
        grade: 1,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Adam",
        last_name: "Koffler",
        grade: 5,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Keira",
        last_name: "Knightley",
        grade: 2,
        active: true,
        hourly_rate: 60,
      },{
        first_name: "Kaleb",
        last_name: "Grantley",
        grade: 2,
        active: true,
        hourly_rate: 60,
      },
    ]).returning("*")
  }

  function insertLessons(students){
    return knex("lessons").insert([
      {
        student_id: students[0].id,
        time: new Date("2017 01 01 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 01 08 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 01 15 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 01 22 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 01 28 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 02 05 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 02 12 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 02 19 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[0].id,
        time: new Date("2017 02 26 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 02 01 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 02 08 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 02 15 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 02 22 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 02 28 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 03 04 15:45").getTime(),
        duration: 30,
      },
      {
        student_id: students[1].id,
        time: new Date("2017 03 11 15:45").getTime(),
        duration: 30,
      },

    ])
  }

  return deleteLessons()
    .then(deleteStudents)
    .then(insertStudents)
    .then(students => insertLessons(students))
}