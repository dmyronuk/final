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
    .join('listing_addresses', 'listings.id', 'listing_addresses.listings_id')
    .join('listing_specifications', 'listings.id', 'listing_specifications.listings_id')
    .select()
  },

  getListing: (id) => {
    return knex('listings')
    .where('listings.id', id)
    .join('listing_addresses', 'listings.id', 'listing_addresses.listings_id')
    .join('listing_specifications', 'listings.id', 'listing_specifications.listings_id')
    .select()
  },

  // currently shows messages between Mary and John
  getAllMessages: () => {
    return knex('messages')
    .join('users', 'messages.sender', 'users.id')
    // .join('users', 'messages.recipient', 'users.id')
    .select()
    .where(function() {
      this.where('sender', 1).andWhere('recipient', 2)
    })
    .orWhere(function() {
      this.where('sender', 2).andWhere('recipient', 1)
    })
    .orderBy('created_at')
  }
}