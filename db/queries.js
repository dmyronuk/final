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
    .where("listings.price", "<", queryObj.price)
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
  addNewListing: (data, imageUrls) => {
    return knex('landlords')
      .where({phone_number: "647-234-2345"})
      .select("id")
      .then(landlord => {
        return knex("neighbourhoods")
          .where({name: "Dovercourt Village"})
          .select("id")
          .then(neighbourhood => {
            return knex('listings')
              .insert({photos: imageUrls, price: data.price, lng: data.lng, lat: data.lat, neighbourhoods_id: neighbourhood[0].id, landlords_id: landlord[0].id })
              .returning('id')
              .then(listing => {
                return knex("listing_addresses")
                .insert({street: data.street, city: data.city, province: data.province, postal_code: data.pCode, listings_id: listing[0]})
                .then (() => {
                  return knex("listing_specifications")
                  .insert({bedrooms: data.bedrooms, bathrooms: data.bathrooms, description: data.description, date_available: data.date, listings_id: listing[0]})
                })
              })
            })

      })

  }
}