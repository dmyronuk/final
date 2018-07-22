const queries = require("../db/queries.js");
const helpers = require("./helpers/helpers.js");

module.exports = {
  index: (req, res) => {
    queries.getAllStudents()
    .then(students => {
      let data = JSON.stringify(students);
      res.json(data);
    })
  },

  studentLessons: (req, res) => {
    let id = req.params.id
    queries.getAllLessonsByStudent(id)
    .then(lessons => {
      let lessons_formatted = lessons.map(elem => {
        elem.date = helpers.prettyFormatDate(elem.date);
        return elem
      })
      res.send(JSON.stringify(lessons_formatted))
    })
  },

  studentInfo: (req, res) => {
    let id = req.params.id
    queries.getStudentInfo(id)
    .then(data => {
      res.send(JSON.stringify(data[0]))
    })
  },

  invoice: (req, res) => {
    let id = req.params.id
    let startDate = req.params.date + "-01";
    let endDate = startDate;

    queries.getStudentInfo(id)
    .then(student => {
      queries.getLessonsInMonthByStudent(id, startDate, endDate)
      .then(lessons => {

        res.render("invoice", {
          student: student[0],
          lessons,
        })
      })
    })
  }
}