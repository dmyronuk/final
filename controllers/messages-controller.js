const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {
  getAllMessages: function (req, res) {
    queries.getAllMessages()
      .then(messages => {
        res.json(messages);
      })
  },

  getFilteredMessages: function (req, res) {
    const sender = req.query.sender;
    const recipient = req.query.recipient;
    queries.getFilteredMessages(sender, recipient)
      .then(messages => {
        res.json(messages);
      })
  },

  addNewMessage: function(req, res) {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const message = req.body.text;
    queries.addNewMessage(sender, recipient, message)
      .then(messages => {
        res.sendStatus(200);
      })
  }
}

module.exports = controller;