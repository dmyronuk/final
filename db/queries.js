// require("dotenv").config();

var knex = require("knex")({
  client: "pg",
  connection: {
    host : "127.0.0.1",
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
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


module.exports = (function() {
  // declare utility functions
  // function xyz () {}
 function getFilteredMessages (sender, recipient) {
    return knex('messages')
    .join('users', 'messages.sender', 'users.id')
    // .join('users', 'messages.recipient', 'users.id')
    .select('users.id', 'created_at', 'text', 'first_name', 'email')
    .where(function() {
      this.where('sender', sender).andWhere('recipient', recipient)
    })
    .orWhere(function() {
      this.where('sender', recipient).andWhere('recipient', sender)
    })
    .orderBy('created_at')
    // .limit(100)
  }

  return {
    // public interface
    // xyz
    getAllUsers: () => {
    return knex("users").select();
  },

  getUserInfo: (user_id) => {
    return knex('users')
    .where('id', user_id)
    .select()
  },

  getUsernameById: (user_id) => {
    return knex('users')
    .where('id', user_id)
    .select('first_name', 'last_name')
  },

  getUserByEmail: (email) => {
    return knex('users')
    .where('email', email)
    .select('email', 'first_name', 'last_name', 'id', 'password_digest')
  },

  getAllLandlords: () => {
    return knex('landlords')
    .select()
  },

  getLandlorByUserId: (userId) => {
    return knex('landlords')
      .where('users_id', userId)
      .first()
  },

  getAllTenants: () => {
    return knex('tenants')
    .select()
  },

  getAllNeighourhoods: () => {
    return knex('neighbourhoods')
    .select()
  },

  getAllListings: (landlordId) => {
    let query = knex('listings')
      .join('listing_addresses', 'listings.id', 'listing_addresses.listings_id')
      .join('listing_specifications', 'listings.id', 'listing_specifications.listings_id')

    if(landlordId) {
      query.where('listings.landlords_id', landlordId)
    }

    return query.select()
  },

  getAllListingsByQuery: (queryObj) => {
    return knex("listings")
    .join("listing_addresses", "listings.id", "listing_addresses.listings_id")
    .join("neighbourhoods", "listings.neighbourhoods_id", "neighbourhoods.id")
    .join("listing_specifications", "listings.id", "listing_specifications.listings_id")
    .where((builder) => {
      builder.where("listing_addresses.street", "like", `%${queryObj.query}%`)
      .orWhere("neighbourhoods.name", "like", `%${queryObj.query}%`)
    })
    .modify((builder) => {
      if(queryObj.bedrooms != "Any"){
        builder.where("listing_specifications.bedrooms", queryObj.bedrooms);
      }
    })
    .modify((builder) => {
      if(queryObj.bathrooms != "Any"){
        builder.where("listing_specifications.bathrooms", queryObj.bathrooms);
      }
    })
    .where("listings.price", "<", queryObj.maxPrice)
    .where("listings.price", ">", queryObj.minPrice)
    .select()
  },

  getListing: (id) => {
    return knex('listings')
    .where('listings.id', id)
    .join('listing_addresses', 'listings.id', 'listing_addresses.listings_id')
    .join('listing_specifications', 'listings.id', 'listing_specifications.listings_id')
    .select()
  },

  // Addin new listing
  addNewListing: (data, imageUrls, landlordId) => {
    return knex('listings')
      .insert({photos: imageUrls,landlords_id: landlordId, price: data.price, lng: data.lng, lat: data.lat})
      .returning('id')
      .then(listing => {
        console.log(listing)
        return knex("listing_addresses")
        .insert({street: data.street, city: data.city, province: data.province, postal_code: data.postal_code, listings_id: listing[0]})
        .then (() => {
          return knex("listing_specifications")
          .insert({bedrooms: data.bedrooms, bathrooms: data.bathrooms, description: data.description, date_available: data.date, listings_id: listing[0]})
        })
      })
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
    .limit(100)
  },

  deleteListing: (listingId) => {
    return knex('listing_specifications')
     .where('listings_id', listingId)
     .del()
     .then(() =>
       knex('listing_addresses')
       .where('listings_id', listingId)
       .del()
       .then(() =>
         knex('listings')
         .where('id', listingId)
         .del()
       )
     )
  },

  updateListing: (listingId, data, imageUrls) => {
    return knex('listings')
      .where('id', listingId)
      .update({price: data.price, lng: data.lng, lat: data.lat, photos: imageUrls})
      .then(() =>
        knex('listing_addresses')
        .where('listings_id', listingId)
        .update({street: data.street, city: data.city, province: data.province, postal_code: data.postal_code})
        .then(() =>
          knex('listing_specifications')
          .where('listings_id', listingId)
          .update({bedrooms: data.bedrooms, bathrooms: data.bathrooms, description: data.description, date_available: data.date})
        )
      )
  },

  getAllRatingsThatUserRated: (user_id) => {
    return knex('users')
    .join('ratings', 'ratings.rater', 'users.id')
    .where('users.id', user_id)
  },

  getAllRatingsOfRatee: (user_id) => {
    return knex('users')
    .join('ratings', 'ratings.ratee', 'users.id')
    .where('users.id', user_id)
  },

  addNewRating: (rater, ratee, rating) => {
    return knex('ratings')
    .insert({
      rater:rater,
      ratee:ratee,
      rating:rating
    })
    .asCallback()
  },

  getFilteredMessages: getFilteredMessages,

  addNewMessage: (sender, recipient, message) => {
    return knex('messages')
    .insert({text: message, sender: sender, recipient: recipient, created_at: new Date()})
    .then(() => {return getFilteredMessages(sender, recipient)}
    )
  },

  signup: data => {
    return knex('users')
    .insert({first_name: data.first_name, last_name: data.last_name, email: data.email, password_digest: data.hashed_password })
    .returning('id')
    .then(user => {
      if (data.user_type === "landlord") {
        return knex('landlords')
        .insert({phone_number: data.phone, users_id: user[0]})
        .then(() => {
          return user[0];
        })
      } else if (data.user_type === "tenant"){
        return knex('tenants')
        .insert({phone_number: data.phone, users_id: user[0]})
        .then(() => {
          return user[0];
        })
      }

    })
  },

  // gets the users that talked to the current user and get their first name
  getAllThreads: current_user => {
    return knex.raw(`
      select c.id, users.first_name, users.last_name from
        (select distinct recipient as id from messages where sender = ?
        union
        select distinct sender from messages where recipient = ?)
        as c join users on users.id = c.id`
      , [current_user, current_user])
      .then(talked_to => {
        return talked_to.rows;
      })
  },

  getUserFromLandlordId: landlord_id => {
    return knex.raw(`
      select users_id from landlords where id = ?
      `, [landlord_id])
    .then(query => {
      let users_id = query.rows[0];
      return users_id;
    })
  }
}

})();

