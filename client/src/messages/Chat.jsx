import React, { Component } from  "react";
import { getFilteredMessages } from "../ajax/messages";
import { getAllRatingsOfUser } from "../ajax/ratings";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
    }
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

  
  addNewRating = () => {
    axios.post("/api/ratings", {
      rater: 1,
      ratee: 2,
      rating: this.state.rating
    })
    .then(res =>{
      console.log("Success")
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addNewRating()
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


  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Rate this user:
            <input
              min={1}
              max={5}
              name="rating"
              type="number"
              value={this.state.rating}
              onChange={this.handleInputChange} />
          </label>
          <button onSubmit={this.handleSubmit}>Submit Rating</button>
        </form>

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