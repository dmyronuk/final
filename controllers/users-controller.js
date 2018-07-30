const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");
const bcrypt = require('bcrypt');

let controller = {

  signup: function(req, res) {
    const data = req.body;
    const hashed_password = bcrypt.hashSync(data.password, 10);
    data.password = null;
    data.password_confirmation = null;
    data.hashed_password = hashed_password;
    console.log(data);
    queries.signup(data)
    .then(() => {
      res.json({status: "success"});
    })
  }

}

module.exports = controller;