exports.seed = function(knex, Promise){

  function deleteUsers(){
    return knex("users").del();
  }

  function deleteLandlords(){
    return knex("landlords").del();
  }

  function deleteTenants(){
    return knex("tenants").del();
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

  // ********************************************************

  function truncateUsers(){
    return knex("users").truncate();
  }

  function truncateLandlords(){
    return knex("landlords").truncate();
  }

  function truncateTenants(){
    return knex("tenants").truncate();
  }

  function truncateMessages(){
    return knex("messages").truncate();
  }

  function truncateNeighbourhoods() {
    return knex('neighbourhoods').truncate();
  }

  function truncateListings() {
    return knex('listings').truncate();
  }



  // ********************************************************

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
    ]).returning("*");
  }

  function insertLandlords() {
    return knex('landlords').insert([
    {
      phone_number: "647-234-2345",
      user_id: users[0],
    },
    ]).returning("*");
  }

  function insertTenants() {
    return knex('landlords').insert([
    {
      phone_number: "647-321-4321",
      user_id: users[1],
    },
    ]).returning("*");
  }

  function insertNeighbourhoods() {
    return knex('neighbourhoods').insert([
    {
      name: "Dovercourt Village",
      crimeRating: "A"
    },
    {
      name: "Parkview Hills",
      crimeRating: "B"
    }
    ]).returning("*");
  }

  function insertListings() {
    return knex("listings").insert([
    {
      address: "46 Spadina Ave, Toronto, ON",
      lat: 43.644576,
      lng: -79.394940,
      price: 12351321,
    },
    {
      address: "725 Bathurst St, Toronto, ON M5S 2R5",
      lat: 43.663366,
      lng: -79.408472,
      price: 450000,
    },
    {
      address: "25 Breadalbane St, Toronto, ON",
      lat: 43.663252,
      lng: -79.385720,
      price: 600000,

    },
    {
      address: "195-271 Albany Ave, Toronto, ON M5R 3C7",
      lat: 43.672512,
      lng: -79.412786,
      price: 700000,
    },
    {
      address: "67-3 Armstrong Ave, Toronto, ON M6H 1V9",
      lat: 43.664022,
      lng: -79.439156,
      price: 10000,
    },
    {
      address: "2-24 St Annes Rd, Toronto, ON M6J 2C1",
      lat: 43.651874,
      lng: -79.425992,
      price: 120000,
    },
    {
      address: "34 Heydon Park Rd, Toronto, ON M6J 2C8",
      lat: 43.653323,
      lng: -79.426887,
      price: 850000,
    },
    {
      address: "224 Wallace Ave, Toronto, ON M6H 1V5",
      lat: 43.662461,
      lng: -79.446297,
      price: 250000,
    },
    {
      address: "133 Yorkville Ave, Toronto, ON M5R 1C4",
      lat: 43.670510,
      lng: -79.393603,
      price: 23000,
    },
    {
      address: "169 Dufferin St, Toronto, ON M6K 1Y9",
      lat: 43.636187,
      lng: -79.425808,
      price: 340000 ,
    },
    {
      address: "345 Dufferin St, Toronto, ON M6K 3G1",
      lat: 43.641066,
      lng: -79.427975,
      price: 450000,
    },
    {
      address: "70-8 Brookfield St, Toronto, ON M6J 3A9",
      lat: 43.645325,
      lng: -79.420666,
      price: 90000,
    },
    ]).returning("*")
  }


  return deleteUsers()
  .then(deleteLandlords)
  .then(deleteTenants)
  .then(deleteMessages)
  .then(deleteNeighbourhoods)
  .then(deleteListings)
  // .then(truncateUsers)
  // .then(truncateLandlords)
  // .then(truncateTenants)
  // .then(truncateMessages)
  // .then(truncateNeighbourhoods)
  // .then(truncateListings)
  .then(insertUsers)
  .then(insertListings)
    // .then(insertStudents)
    // .then(students => insertLessons(students))
  }