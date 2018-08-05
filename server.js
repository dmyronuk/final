const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
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
app.use("/images", express.static(__dirname + "/public/images"));
app.use(bodyParser.json());

const routes = require("./routes.js")(app);

app.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Server running on Port ${PORT}`);
})



// web socket server
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const wss = new SocketServer({ port: 8080 });


// broadcast to all current online users
wss.broadcast = (data, ws) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}



wss.on('connection', (ws) => {
  console.log('Client connected');
  // var userID = parseInt(ws.upgradeReq.url.substr(1), 10)
  // console.log(userID);
  // console.log(wss.clients.size);

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    switch(data.type) {
      case "postMessage":
      data.type = "incomingMessage";
      break;
      default:
      // show an error in the console if the message type is known
      throw new Error("Unknown data type " + data.type);
    }
     wss.broadcast(data, ws);
  });

  ws.on('close', () => {
    console.log('Client disconnected')
  });
})