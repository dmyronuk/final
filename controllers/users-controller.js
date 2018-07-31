const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");

let controller = {

  signup: function(req, res) {
    const data = req.body;
    console.log(data);
    queries.signup(data)
    .then(() => {
      res.send({
        token: "123456",
        status: "success",
      });
    })
  }

}

module.exports = controller;