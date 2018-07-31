const express = require("express");
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application / vnd.api + json'
}));
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const routes = require('./routes.js')(app);

app.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Server running on Port ${PORT}`);
})

const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const wss = new SocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size);

  ws.on('close', () => {
    console.log('Client disconnected')
  });
})