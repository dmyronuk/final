const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {
  getAllMessages: function (req, res) {
    queries.getAllMessages()
      .then(messages => {
        res.json(messages);
      })
  }
}

module.exports = controller;