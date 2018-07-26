require("dotenv").config();

var knex = require("knex")({
  client: "pg",
  connection: {
    host : "127.0.0.1",
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});

module.exports = {
  getAllUsers: () => {
    return knex("users").select()
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

  getAllListings: () => {
    return knex('listings')
      .select()
  },
}