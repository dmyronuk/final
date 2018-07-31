const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {
  getAllRatingsOfUser: function (req, res) {
    queries.getAllRatingsOfUser(user)
      .then(rating => {
        res.json(rating);
      })
  },
  addNewRating: function(req, res) {
    let rater = req.body.rater;
    let ratee = req.body.ratee;
    let rating = req.body.rating;
    queries.addNewRating(rater, ratee, rating)
      .then(rating => {
        console.log(rating);
        res.json(rating);
      })
  }
}

module.exports = controller;