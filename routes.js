"use strict";

const listingsController = require('./controllers/listings-controller.js');
const photoController = require('./controllers/photo-controller.js');
const yelpController = require('./controllers/yelp-controller.js');
const messagesController = require('./controllers/messages-controller.js');

module.exports = function(app) {
    app.post('/api/listings/search', listingsController.searchListings);
    app.post('/api/listings/:id/yelp', yelpController.categorySearchByLocation);
    app.get('/api/listings/:id', listingsController.getListing);
    app.get('/api/listings', listingsController.getAllListings);
    app.post('/api/listings', listingsController.postListings);
    app.post('/api/upload', photoController.uploadFile);
    app.get ('/api/messages', messagesController.getAllMessages);
    app.get('/api/filtered-messages', messagesController.getFilteredMessages);
    app.post('/api/newMessage', messagesController.addNewMessage);
};