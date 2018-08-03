const queries = require("../db/queries.js");
const helpers = require("../helpers/helpers.js");
const jwt = require("jsonwebtoken");
var fs = require('fs');

let controller = {
  searchListings: function(req, res){
    queries.getAllListingsByQuery(req.body)
      .then(listings => {
        res.json(listings);
      })
  },

  getListings: function (req, res) {
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

  postListings: async function(req, res) {
    let imageUrls = req.body.images
    let data = req.body.data
    console.log(data, req.decodedToken.id)

     let landlord = await queries.getLandlorByUserId(req.decodedToken.id)
      queries.addNewListing(data, imageUrls, landlord.id)
        .then(data => {
          res.end();
        })
        .catch(error => {
          console.log(error);
          res.json({status: "refused"});
        })
  },

  editListing: async function(req, res) {
    let listingData = req.body.data
    let listingId = req.params.id
    let imageUrls = req.body.imageURLs
    let landlord = await queries.getLandlorByUserId(req.decodedToken.id)

    queries.getListing(listingId)
      .then(rows => {
        if (rows[0].landlords_id !== landlord.id) {
          res.status(401).end();
          return
        }
        queries.updateListing(listingId, listingData, imageUrls)
        .then(rows => {
          res.json({message: "success"})
        })
      })
  },

  deleteListing: async function(req, res) {
    const listingId = req.params.id;
    let landlord = await queries.getLandlorByUserId(req.decodedToken.id)
    let photos ;
    queries.getListing(listingId)
      .then(data => {
        if (data[0].landlords_id !== landlord.id) {
          res.status(401).end();
          return
        }
        photos = data[0].photos
        photos.forEach(elm =>
          fs.unlink("./public" + elm.replace("http://localhost:3001", ""), (err) => {
            if (err) {
              console.log("failed to delete local image:"+err);
            } else {
              console.log('successfully deleted local image');
            }
          })
        )
        queries.deleteListing(listingId)
        .then(data => {
          res.json({message: "Done!"})
        })
      })
  }
};
module.exports = controller;