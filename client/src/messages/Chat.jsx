import React, { Component } from  "react";
import { getFilteredMessages } from "../ajax/messages";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // allows the messages to be viewed from the most recent
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  // allow user to add a new message
  addNewMessage = (content) => {
    console.log(content);
    // this is hardcoded, change using jwt
    const newMessage = {
      type: "postMessage",
      text: content,
      first_name: "Mary",
      email: "mary@gmail.com"
    }
    this.socket.send(JSON.stringify(newMessage));
    // end of hard code
    axios.post('/api/newMessage', {
      sender: 1,
      recipient: 2,
      message: content,
    }).then(messages => {
      // console.log(messages);
      // this.setState({
      //   messages: messages.data
      // })
    })
  }



  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.addEventListener('open', e => {
      console.log("connected to server");
    })

    // when a new message is recieved
    this.socket.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      console.log("went through");
      console.log(data);

      let createMessage = {text: data.text, first_name: data.first_name, email: data.email};

      switch(data.type) {
        // adds new message to pre-existing messages
        case "incomingMessage":
        this.setState({ messages: this.state.messages.concat([createMessage]) })
        console.log(this.state.messages);
        break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type: " + data.type);
      }
    }

    getFilteredMessages(1, 2)
    .then(messages => {
      this.setState({
        messages
      })
      console.log(messages);
    });
  }

  render() {
    return (
      <div>
      {this.state.messages &&
        <div>
          <MessageList messages={this.state.messages}/>
        </div>
      }
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar addNewMessage = {this.addNewMessage}/>
      </div>
      )
  }
}

export default Chat