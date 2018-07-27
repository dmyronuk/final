const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const PORT = 3001;

app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

const routes = require('./routes.js')(app)

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})