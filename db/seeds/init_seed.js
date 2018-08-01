var faker = require('faker');

function randomParagraphGen() {
  let paragraph = "";
  for (let i = 0; i < 5; ++i) {
    paragraph += " " + faker.hacker.phrase();
  }
  return paragraph;
}

// returns an integer from min to max inclusive
function randomIntegerGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function numberBedroomsGen() {
  return randomIntegerGenerator(1, 7);
}

function numberBathroomsGen() {
  return randomIntegerGenerator(1, 4);
}

function randomCostGen() {
  return randomIntegerGenerator(50, 600) * 10;
}


// function repeat(min, max) {
//   for (let i = 0; i < 100; ++i) {
//     console.log(randomIntegerGenerator(min, max));
//   }
// }

exports.seed = function(knex, Promise) {

  function deleteUsers(){
    return knex("users").del();
  }

  function deleteLandlords(){
    return knex("landlords").del();
  }

  function deleteTenants(){
    return knex("tenants").del();
  }

  function deleteRatings(){
    return knex("ratings").del();
  }

  function deleteMessages(){
    return knex("messages").del();
  }

  function deleteNeighbourhoods(){
    return knex("neighbourhoods").del();
  }

  function deleteListings(){
    return knex("listings").del();
  }

  function deleteListingAddresses() {
    return knex("listing_addresses").del();
  }

  function deleteListingSpecifications() {
    return knex("listing_specifications").del();
  }


  function insertUsers() {
    return knex('users').insert([
    {
      first_name: "Mary",
      last_name: "Ann",
      email: "mary@gmail.com",
      password_digest: "mary",
    },
    {
      first_name: "John",
      last_name: "Smith",
      email: "john@gmail.com",
      password_digest: "john",
    },
    {
      first_name: "Bob",
      last_name: "Singh",
      email: "bob@gmail.com",
      password_digest: "bob",
    },
    ]).returning("*");
  }

  function insertLandlords(users) {
    return knex('landlords').insert([
    {
      phone_number: "647-234-2345",
      users_id: users[0].id,
    },
    ]).returning("*");
  }

  function insertTenants(users) {
    return knex('tenants').insert([
    {
      phone_number: "647-321-4321",
      users_id: users[1].id,
    },
    {
      phone_number: "647-999-9999",
      users_id: users[2].id,
    },
    ]).returning("*");
  }

  function insertMessages(users) {
    return knex("messages").insert([
    {
     text: "Hey John, we can book a day. When are you usually free?",
     sender: users[0].id,
     recipient: users[1].id,
     created_at: new Date("2017 02 19 15:46"),
   },
   {
     text: "Hello there. I am interested in this rent",
     sender: users[1].id,
     recipient: users[0].id,
     created_at: new Date("2017 02 19 15:45"),
   },

   {
     text: "Hi Mary, I am available this Friday at three",
     sender: users[1].id,
     recipient: users[0].id,
     created_at: new Date("2017 02 19 15:48"),
   },
   {
     text: "Hi there, I'm cool",
     sender: users[2].id,
     recipient: users[0].id,
     created_at: new Date("2017 02 19 17:58"),
   },
   ]).returning("*")
  }

  function insertNeighbourhoods() {
    return knex('neighbourhoods').insert([
    {
      name: "Dovercourt Village",
      crime_rating: "A"
    },
    {
      name: "Parkview Hills",
      crime_rating: "B"
    }
    ]).returning("*")
  }



  function insertListings(landlords, neighbourhoods) {
    return knex("listings").insert([
    {
      // lat, lng  in this order
      // address: "46 Spadina Ave, Toronto, ON",
      lat: 43.644576,
      lng: -79.394940,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id
    },
    {
      // address: "725 Bathurst St, Toronto, ON M5S 2R5",
      lat: 43.663366,
      lng: -79.408472,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    {
      // address: "25 Breadalbane St, Toronto, ON",
      lat: 43.663252,
      lng: -79.385720,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id,

    },
    {
      // address: "195-271 Albany Ave, Toronto, ON M5R 3C7",
      lat: 43.672512,
      lng: -79.412786,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id,
    },
    {
      // address: "67-3 Armstrong Ave, Toronto, ON M6H 1V9",
      lat: 43.664022,
      lng: -79.439156,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    {
      // address: "2-24 St Annes Rd, Toronto, ON M6J 2C1",
      lat: 43.651874,
      lng: -79.425992,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    {
      // address: "34 Heydon Park Rd, Toronto, ON M6J 2C8",
      lat: 43.653323,
      lng: -79.426887,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id,
    },
    {
      // address: "224 Wallace Ave, Toronto, ON M6H 1V5",
      lat: 43.662461,
      lng: -79.446297,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id,
    },
    {
      // address: "133 Yorkville Ave, Toronto, ON M5R 1C4",
      lat: 43.670510,
      lng: -79.393603,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[0].id,
    },
    {
      // address: "169 Dufferin St, Toronto, ON M6K 1Y9",
      lat: 43.636187,
      lng: -79.425808,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    {
      // address: "345 Dufferin St, Toronto, ON M6K 3G1",
      lat: 43.641066,
      lng: -79.427975,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    {
      // address: "70-8 Brookfield St, Toronto, ON M6J 3A9",
      lat: 43.645325,
      lng: -79.420666,
      price: randomCostGen(),
      landlords_id: landlords[0].id,
      neighbourhoods_id: neighbourhoods[1].id,
    },
    ]).returning("*")
  }


  function insertListingSpecifications(listings) {
    return knex("listing_specifications").insert([
    {
      bedrooms: numberBedroomsGen(),
      bathrooms: numberBathroomsGen(),
      description: randomParagraphGen(),
      date_available: new Date("2019 02 19 15:45"),
      listings_id: listings[0].id,
      // address: "46 Spadina Ave, Toronto, ON",
    },
    {
      bedrooms: numberBedroomsGen(),
      bathrooms: numberBathroomsGen(),
      description: randomParagraphGen(),
      date_available: new Date("2019 02 19 15:45"),
      listings_id: listings[1].id,
      // address: "725 Bathurst St, Toronto, ON M5S 2R5",
    },
    {
      bedrooms: numberBedroomsGen(),
      bathrooms: numberBathroomsGen(),
      description: randomParagraphGen(),
      date_available: new Date("2019 02 19 15:45"),
      listings_id: listings[2].id,
     // address: "25 Breadalbane St, Toronto, ON M4Y 1C2",

   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[3].id,
     // address: "195-271 Albany Ave, Toronto, ON M5R 3C7",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[4].id,
     // address: "67-3 Armstrong Ave, Toronto, ON M6H 1V9",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[5].id,
     // address: "2-24 St Annes Rd, Toronto, ON M6J 2C1",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[6].id,
     // address: "34 Heydon Park Rd, Toronto, ON M6J 2C8",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[7].id,
     // address: "224 Wallace Ave, Toronto, ON M6H 1V5",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[8].id,
     // address: "133 Yorkville Ave, Toronto, ON M5R 1C4",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[9].id,
     // address: "169 Dufferin St, Toronto, ON M6K 1Y9",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[10].id,
     // address: "345 Dufferin St, Toronto, ON M6K 3G1",
   },
   {
    bedrooms: numberBedroomsGen(),
    bathrooms: numberBathroomsGen(),
    description: randomParagraphGen(),
    date_available: new Date("2019 02 19 15:45"),
    listings_id: listings[11].id,
     // address: "70-8 Brookfield St, Toronto, ON M6J 3A9",
   },
   ]).returning("*")
  }

  function insertListingAddresses(listings) {
    return knex("listing_addresses").insert([
    {
      street: "46 Spadina Ave",
      city: "Toronto",
      province: "ON",
      postal_code: "M5V 2H8",
      listings_id: listings[0].id,
      // address: "46 Spadina Ave, Toronto, ON",
    },
    {
     street: "725 Bathurst St",
     city: "Toronto",
     province: "ON",
     postal_code: "M5S 2R5",
     listings_id: listings[1].id,
     // address: "725 Bathurst St, Toronto, ON M5S 2R5",
   },
   {
     street: "25 Breadalbane St",
     city: "Toronto",
     province: "ON",
     postal_code: "M4Y 1C2",
     listings_id: listings[2].id,
     // address: "25 Breadalbane St, Toronto, ON M4Y 1C2",

   },
   {
     street: "195-271 Albany Ave",
     city: "Toronto",
     province: "ON",
     postal_code: "M5R 3C7",
     listings_id: listings[3].id,
     // address: "195-271 Albany Ave, Toronto, ON M5R 3C7",
   },
   {
     street: "67-3 Armstrong Ave",
     city: "Toronto",
     province: "ON",
     postal_code: "M6H 1V9",
     listings_id: listings[4].id,
     // address: "67-3 Armstrong Ave, Toronto, ON M6H 1V9",
   },
   {
     street: "2-24 St Annes Rd",
     city: "Toronto",
     province: "ON",
     postal_code: "M6J 2C1",
     listings_id: listings[5].id,
     // address: "2-24 St Annes Rd, Toronto, ON M6J 2C1",
   },
   {
     street: "34 Heydon Park Rd",
     city: "Toronto",
     province: "ON",
     postal_code: "M6J 2C8",
     listings_id: listings[6].id,
     // address: "34 Heydon Park Rd, Toronto, ON M6J 2C8",
   },
   {
     street: "224 Wallace Ave",
     city: "Toronto",
     province: "ON",
     postal_code: "M6H 1V5",
     listings_id: listings[7].id,
     // address: "224 Wallace Ave, Toronto, ON M6H 1V5",
   },
   {
     street: "133 Yorkville Ave",
     city: "Toronto",
     province: "ON",
     postal_code: "M5R 1C4",
     listings_id: listings[8].id,
     // address: "133 Yorkville Ave, Toronto, ON M5R 1C4",
   },
   {
     street: "169 Dufferin St",
     city: "Toronto",
     province: "ON",
     postal_code: "M6K 1Y9",
     listings_id: listings[9].id,
     // address: "169 Dufferin St, Toronto, ON M6K 1Y9",
   },
   {
     street: "345 Dufferin St",
     city: "Toronto",
     province: "ON",
     postal_code: "M6K 3G1",
     listings_id: listings[10].id,
     // address: "345 Dufferin St, Toronto, ON M6K 3G1",
   },
   {
     street: "70-8 Brookfield St",
     city: "Toronto",
     province: "ON",
     postal_code: "M6J 3A9",
     listings_id: listings[11].id,
     // address: "70-8 Brookfield St, Toronto, ON M6J 3A9",
   },
   ]).returning("*")
  }

  function insertRatings(users){
    return knex('ratings').insert([
    {
      rating: 5,
      rater: users[0].id,
      ratee: users[1].id,
    },
    {
      rating: 5,
      rater: users[2].id,
      ratee: users[0].id,
    },
    {
      rating: 4,
      rater: users[2].id,
      ratee: users[1].id,
    },
    {
      rating: 4,
      rater: users[0].id,
      ratee: users[2].id,
    },
    ]).returning("*");

  }


  return deleteListingSpecifications()
  .then(deleteListingAddresses)
  .then(deleteListings)
  .then(deleteNeighbourhoods)
  .then(deleteMessages)
  .then(deleteLandlords)
  .then(deleteTenants)
  .then(deleteRatings)
  .then(deleteUsers)

  // .then(deleteListingSpecifications)


  .then(insertUsers)
  .then(users =>  {
    console.log(users)
    return insertRatings(users)
    .then(()=>{
      return insertLandlords(users)
      .then(landlords => {
        return insertTenants(users)
        .then(() => {
          return insertMessages(users)
          .then(insertNeighbourhoods)
          .then(neighbourhoods => {
            // console.log(neighbourhoods);
            return insertListings(landlords, neighbourhoods)
            .then(listings => {
              return insertListingSpecifications(listings)
              .then(() => {
                return insertListingAddresses(listings)
              })
            })
          })
        })
      })
    })
  });

    // .then(insertStudents)
    // .then(students => insertLessons(students))
  }