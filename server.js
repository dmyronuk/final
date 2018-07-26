const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.static(__dirname + "/public"));

const routes = require("./routes/main.js")
app.get("/listings", routes.listings)

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})