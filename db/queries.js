// require("dotenv").config();

var knex = require("knex")({
  client: "pg",
  connection: {
    host : "127.0.0.1",
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});

//console.log(process.env);
// getAllUsers1 = () => {
//   return knex("users").select();
// }

// getAllUsers1().then(users => {
//   let data = JSON.stringify(users);
//   console.log(data);
// });



// knex("users").select()
// .then(users => {
//   let data = JSON.stringify(users);
//   console.log(data);
// });



// function hello() {
//   return knex("users").select();
// }

// hello().then(users => {
//   let data = JSON.stringify(users);
//   console.log(data);
// });

module.exports = {
  getAllUsers: () => {
    return knex("users").select();
  },

  getUserInfo: (user_id) => {
    return knex('users')
    .where('id', user_id)
    .select()
  },

  getAllLandlords: () => {
    return knex('landlords')
    .select()
  },

  getAllTenants: () => {
    return knex('tenants')
    .select()
  },

  getAllNeighourhoods: () => {
    return knex('neighbourhoods')
    .select()
  },

  getAllListings: () => {
    return knex('listings')
    .select()
  },
}