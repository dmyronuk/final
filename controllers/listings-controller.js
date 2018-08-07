const queries = require("../db/queries.js");
const helpers = require("../helpers/helpers.js");
const validations = require("../helpers/validations.js");
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

  getLandlordListings:  async function (req, res) {
    let landlord = await queries.getLandlorByUserId(req.decodedToken.id)
    if (!landlord) {
      res.status(401).end()
      return
    }
    queries.getAllListings(landlord.id)
      .then(listings => {
        res.json(listings)
      })
  },

  postListings: async function(req, res) {
    let imageUrls = req.body.images
    let data = req.body.data
    let errors = []
    let values = Object.values(data)
    let integers = Object.keys(data).slice(6,9).map(key => ({[key]:data[key]}));
    let integersErrors = validations.integerInputsAreValid(integers)

    !validations.allFieldsPresent(values) && errors.push("All fields mandatory");
    errors = errors.concat(integersErrors)

    let landlord = await queries.getLandlorByUserId(req.decodedToken.id)
    if (errors.length) {
      res.json({errors: errors});
      return
    }
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
    let errors = []
    let values = Object.values(listingData)
    let integers = Object.keys(listingData).slice(6,9).map(key => ({[key]:listingData[key]}));
    let integersErrors = validations.integerInputsAreValid(integers)

    !validations.allFieldsPresent(values) && errors.push("All fields mandatory");
    errors = errors.concat(integersErrors)

    if (errors.length) {
      res.json({errors: errors});
      return
    }

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