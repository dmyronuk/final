const express = require("express");
const app = express();
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

app.use(express.static(__dirname + "/public"));

const routes = require("./routes/main.js")


app.get("/students/:id/invoices/:date", routes.invoice)
app.get("/students/:id/lessons", routes.studentLessons)
app.get("/students/:id", routes.studentInfo)
app.get("/students", routes.index);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})