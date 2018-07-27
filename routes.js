"use strict";

const listingsController = require('./controllers/listings-controller.js');
const photoController = require('./controllers/photo-controller.js');

module.exports = function(app) {
    app.get('/api/listings', listingsController.getListings);
    app.post('/api/listings', listingsController.postListings);
    app.post('/api/upload', photoController.uploadFile);

};