const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const PORT = 3001;

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application / vnd.api + json'
}));
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

const routes = require('./routes.js')(app)

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})