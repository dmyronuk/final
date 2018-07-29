"use strict";

const listingsController = require('./controllers/listings-controller.js');
const photoController = require('./controllers/photo-controller.js');
const messagesController = require('./controllers/messages-controller.js');

module.exports = function(app) {
    app.get('/api/listings/:id', listingsController.getListing);
    app.get('/api/listings', listingsController.getAllListings);
    app.post('/api/listings', listingsController.postListings);
    app.post('/api/upload', photoController.uploadFile);
    app.get ('/api/messages', messagesController.getAllMessages);

};