const queries = require("../db/queries.js");
const helpers = require("../helpers/helpers.js");

let controller = {
  searchListings: function(req, res){
    queries.getAllListingsByQuery(req.body)
      .then(listings => {
        res.json(listings);
      })
  },

  getAllListings: function (req, res) {
    queries.getAllListings()
      .then(listings => {
        res.json(listings);
      })
  },

  getListing: function (req, res) {
    queries.getListing(req.params.id)
      .then(listing => {
        res.json(listing);
      })
  },

  // Add new routes below
  postListings: function(req, res) {
    const imageUrls = req.body.images
    const data = req.body.data
    queries.addNewListing(data, imageUrls)
      .then(res => {
          res({})
        })
  }
};
module.exports = controller;