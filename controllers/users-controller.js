const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {

  signup: function(req, res) {
    const data = req.body.data;
    queries.signup(data)
    .then(() => {
      res.send("success");
    })
  }

}

module.exports = controller;