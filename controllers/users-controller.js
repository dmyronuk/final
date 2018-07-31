const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let controller = {

  profile: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if(err){
        console.log(err)
      }
      console.log("User id:", decoded.id)
      res.json({
        status: "Success",
      })
    })
  },

  login: (req, res) => {
    let token = null;
    let userData = null;
    const errorMessages = [];
    const email = req.body.email.toLowerCase();
    queries.getUserByEmail(email)
    .then((dataArr) => {
      userData = dataArr.length > 0 ? dataArr[0] : null;

      if(userData){
        //check if password matches hash
        const passwordIsValid = bcrypt.compareSync(req.body.password, userData.password_digest)
        if(passwordIsValid){
          token = jwt.sign(userData, process.env.JWT_PRIVATE_KEY, {expiresIn: "24h"});
        }else{
          errorMessages.push("Incorrect Password")
        }
      }else{
        errorMessages.push("Email does not exist");
      }

      res.json({
        errorMessages,
        token,
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          id: userData.id,
        }
      })
    })
  },

  signup: (req, res) => {
    const data = req.body;
    const hashed_password = bcrypt.hashSync(data.password, 10);
    data.password = null;
    data.password_confirmation = null;
    data.hashed_password = hashed_password;
    queries.signup(data)
    .then(() => {
      const tokenPayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        id: data.id,
      }
      var token = jwt.sign(tokenPayload, process.env.JWT_PRIVATE_KEY, {expiresIn: "24h"});
      res.json({
        token,
        user: tokenPayload,
        status: "success",
      });
    })
  }
}

module.exports = controller;