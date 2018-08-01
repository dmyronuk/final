import React, { Component } from "react";
import { getFilteredMessages } from "../ajax/messages";
import { getAllRatingsThatUserRated } from "../ajax/ratings";
import MessageList from "./MessageList.jsx";
import RatingsForm from "./RatingsForm.jsx";
import ChatBar from "./ChatBar.jsx";
import axios from 'axios';
import { isNullOrUndefined } from "util";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      alreadyRated: true,
    }
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

  addNewRating = (e) => {
    e.preventDefault();
    axios.post("/api/ratings", {
      // replace rater with currentUser.id later, and ratee with message.recipient.user.id
      rater: 1,
      ratee: 2,
      rating: this.state.rating
    })
      .then(res => {
        console.log("Success")
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

      let createMessage = { text: data.text, first_name: data.first_name, email: data.email };

      switch (data.type) {
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
        // console.log(messages);
      });

    // replace (1,3) with (user.id value, recipient.id) later
    this.checkIfRated(1, 2)
  }

  checkIfRated = async (rater, ratee) => {
    let AllRatingsOfRater = await getAllRatingsThatUserRated(rater)
    console.log(AllRatingsOfRater)
    AllRatingsOfRater.forEach(e =>{
      if (e.rater === rater && e.ratee === ratee){
        return this.setState({alreadyRated:true})
      }
      this.setState({alreadyRated:false})
    })
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
        {
          !this.state.alreadyRated &&
          <RatingsForm 
            addNewRating={this.addNewRating}
            handleInputChange ={this.handleInputChange}
            rating = {this.state.rating}
          />
        }
       
        {this.state.messages &&
          <div>
            <MessageList messages={this.state.messages} />
          </div>
        }
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar addNewMessage={this.addNewMessage} />
      </div>
    )
  }
}

export default Chat