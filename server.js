const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const PORT = 3001;

const usersWs = []; // manually store connected websocket objects
const contacts = []; // who the websockets are and who they are contacting

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
  const sender = data.sender;
  const recipient = data.recipient;

  // manually check who to send the message to because don't want everyone to see the new socket message
  // only the sender and its corresponding recipient can see the message
  usersWs.forEach(function each(user, index) {
    const contact = contacts[index];
    if ((contact.current_user === sender && contact.other_user === recipient) || (contact.current_user === recipient && contact.other_user === sender && user.readyState === WebSocket.OPEN)) {
      console.log("sent!!");
      user.send(JSON.stringify(data));
    }
  });
  // DON'T REMOVE UNTIL FOR SURE THE CODE ABOVE WORKS!
  // wss.clients.forEach(function each(client) {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(JSON.stringify(data));
  //   }
  // });
}



wss.on('connection', (ws) => {
  console.log('Client connected');
  // cool.push(ws);
  // console.log(cool)  ;
  // var userID = parseInt(ws.upgradeReq.url.substr(1), 10)
  // console.log(userID);
  // console.log(wss.clients.size);

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    switch(data.type) {
      // new message
      case "postMessage":
      data.type = "incomingMessage";
      wss.broadcast(data, ws);
      break;
      // new socket user connected
      case "postSocket":
      usersWs.push(ws);
      contacts.push(data.talking_pair);
      // console.log("user entered");
      // console.log("usersWS: ", usersWs);
      // console.log("contacts: ", contacts);
      break;
      default:
      // show an error in the console if the message type is known
      throw new Error("Unknown data type " + data.type);
    }

  });

  ws.on('close', () => {
    // finds who the user is
    var index = usersWs.indexOf(ws);
    // console.log(index);
    // removes user connected and who they are talking to if that user exists
    if (index > -1) {
      usersWs.splice(index, 1);
      contacts.splice(index, 1);
    }
    // console.log("after exiting!!!!");
    // console.log("usersWS: ", usersWs);
    // console.log("contacts: ", contacts);
    console.log('Client disconnected')
  });
})