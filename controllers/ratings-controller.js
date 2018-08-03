const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {
  getAllRatingsThatUserRated: (req, res) => {
    let user_id = req.query.user_id
    queries.getAllRatingsThatUserRated(user_id)
      .then(rating => {
        res.json(rating);
      })
  },
  getAllRatingsOfRatee: (req, res) => {
    let user_id = req.query.user_id
    queries.getAllRatingsOfRatee(user_id)
      .then(rating => {
        res.json(rating);
      })
  },
  addNewRating: (req, res) => {
    let rater = req.body.rater;
    let ratee = req.body.ratee;
    let rating = req.body.rating;
    queries.addNewRating(rater, ratee, rating)
      .then(() => {
        res.sendStatus(200);
      })
  }
}

module.exports = controller;
