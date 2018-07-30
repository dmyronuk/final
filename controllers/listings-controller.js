const queries = require("../db/queries.js");
const helpers = require("../helpers/helpers.js");

let controller = {
  searchListings: function(req, res){
    queries.getAllListingsByQuery(req.body)
      .then(listings => {
        res.json(listings);
      })
  },

  getListings: function (req, res) {
    console.log(req.query.user_id)
    queries.getAllListings(req.query.user_id)
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
      .then(data => {
          res.json({})
        })
  },

  editListing: function(req, res) {
    let data = req.body.data
    let listingId = req.params.id
    queries.updateListing(listingId, data)
      .then(data => {
        res.json({message: "Done!"})
      })
  },

  deleteListing: function(req, res) {
    const listingId = req.params.id;
    console.log(listingId);
    queries.deleteListing(listingId)
      .then(data => {
        res.json({message: "Done!"})
      })
  }
};
module.exports = controller;