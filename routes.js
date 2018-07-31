"use strict";

const listingsController = require('./controllers/listings-controller.js');
const photoController = require('./controllers/photo-controller.js');
const yelpController = require('./controllers/yelp-controller.js');
const messagesController = require('./controllers/messages-controller.js');
const usersController = require('./controllers/users-controller.js');

module.exports = function(app) {
    app.post('/api/listings/search', listingsController.searchListings);
    app.post('/api/listings/:id/yelp', yelpController.categorySearchByLocation);
    app.get('/api/listings/:id', listingsController.getListing);
    app.get('/api/listings', listingsController.getListings);
    app.post('/api/listings', listingsController.postListings);
    app.post('/api/upload', photoController.uploadFile);
    app.get ('/api/messages', messagesController.getAllMessages);
    app.delete('/api/listings/:id', listingsController.deleteListing);
    app.patch('/api/listings/:id', listingsController.editListing);
    app.get('/api/filtered-messages', messagesController.getFilteredMessages);
    app.post('/api/newMessage', messagesController.addNewMessage);
    app.post('/api/signup', usersController.signup);
    app.post('/api/profile', usersController.profile)
    app.post('/api/login', usersController.login)
};