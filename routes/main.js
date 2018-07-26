const queries = require("../db/queries.js");
const helpers = require("./helpers/helpers.js");

module.exports = {
  listings: (req, res) => {
    queries.getAllListings()
    .then(listings => {
      let data = JSON.stringify(listings);
      res.json(data);
    })
  },
}