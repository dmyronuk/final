const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.static(__dirname + "/public"));

const routes = require("./routes/main.js")


app.get("/students/:id/invoices/:date", routes.invoice)
app.get("/students/:id/lessons", routes.studentLessons)
app.get("/students/:id", routes.studentInfo)
app.get("/students", routes.index);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})