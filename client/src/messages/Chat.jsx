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
    axios.post('/api/newMessage', {
      sender: 1,
      recipient: 2,
      message: content,
    }).then(messages => {
      console.log(messages);
      this.setState({
        messages: messages.data
      })
    })
  }



  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    getFilteredMessages(1, 2)
    .then(messages => {
      this.setState({
        messages
      })
      // console.log(messages);
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