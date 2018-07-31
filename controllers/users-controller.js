const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");
const validations = require("../helpers/validations.js");
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
    const errors = [];
    const data = req.body;
    console.log("data: ", data);

  //   first_name: 'Frank',
  // last_name: 'Tank',
  // phone: '444-444-4444',
  // email: 'Frank@tank.com',
  // password: 'password',
  // password_confirmation: 'password',
  // user_type: 'landlord'
    ! validations.passwordIsValid(data.password) && errors.push("Password must be 8 characters");
    ! validations.allFieldsPresent([data.first_name, data.last_name, data.user_type, data.email ]) && errors.push("All fields mandatory");
    ! validations.phoneNumberIsValid(data.phone) && errors.push("Invalid phone number")
    ! validations.passwordsMatch(data.password, data.password_confirmation) && errors.push("Passwords do not match")

    //if all validations pass then insert the new user into the database
    if(errors.length === 0){
      const hashed_password = bcrypt.hashSync(data.password, 10);
      data.hashed_password = hashed_password;
      queries.signup(data)
      .then((userId) => {
        const tokenPayload = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          id: userId,
        }
        var token = jwt.sign(tokenPayload, process.env.JWT_PRIVATE_KEY, {expiresIn: "24h"});
        res.json({
          token,
          user: tokenPayload,
          errors: null,
        });
      })
    }else{
      res.json({
        errors
      })
    }
  }
}

module.exports = controller;