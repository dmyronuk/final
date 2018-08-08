const queries = require("../db/queries");
const helpers = require("../helpers/helpers.js");
const validations = require("../helpers/validations.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let controller = {

  profile: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if(err){
        console.log(err)
        res.status(403).json({error: "token expired"})
      }else{
          res.json({
          id: decoded.id,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          email: decoded.email,
        })
      }
    })
  },

  login: (req, res) => {
    let token = null;
    let userData = null;
    const errors = [];
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    if(email && password){
      queries.getUserByEmail(email)
      .then((dataArr) => {
        userData = dataArr.length > 0 ? dataArr[0] : null;

        //if user exists in database and password is valid, set token
        if(userData && bcrypt.compareSync(password, userData.password_digest) ){
          token = jwt.sign(userData, process.env.JWT_PRIVATE_KEY, {expiresIn: "24h"});
        }else{
          errors.push("Login failed");
        }

        const user = userData ? {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          id: userData.id,
        } : null

        res.json({
          errors,
          token,
          user,
        })
      })
    }else{
      res.json({
        errors: ["All fields required"],
      })
    }
  },

  signup: (req, res) => {
    const errors = [];
    const data = req.body;

    ! validations.allFieldsPresent([data.first_name, data.last_name, data.user_type, data.email ]) && errors.push("All fields mandatory");
    ! validations.phoneNumberIsValid(data.phone) && errors.push("Invalid phone number")
    ! validations.passwordIsValid(data.password) && errors.push("Password must be 8 characters");
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
  },

  threads: (req, res) => {
    const current_user = req.query.user_id
    queries.getAllThreads(current_user)
    .then(thread => {
      res.json(thread);
    })
  },

  //route to fetch username of other user in chat
  getUsernameById: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      //if jwt is invalid, do not send back user info
      if(err){
        res.json({userInfo: null})
      }else{
        queries.getUsernameById(req.params.id)
        .then(userInfo => {
          if(userInfo[0]){
            res.json(userInfo[0])
          }else{
            res.json({first_name:null, last_name:null})
          }
        })
      }
    })
  },

  getUserFromLandlordId: (req, res) => {
    let landlord_id = req.query.landlord_id;
    queries.getUserFromLandlordId(landlord_id)
    .then(users_id => {
      res.json(users_id);
    })
  },

  getLandlord: (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if(err){
        console.log(err)
      }
      queries.getLandlorByUserId(decoded.id)
      .then(data => {
        data? res.json({id: data.id}) : res.json({id: false})
      })
    })
  }
}

module.exports = controller;