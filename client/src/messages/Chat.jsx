import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import MessageList from "./MessageList.jsx";
import RatingsForm from "./RatingsForm.jsx";
import ChatBar from "./ChatBar.jsx";
import { getFilteredMessages, getUsernameById } from "../ajax/messages";
import { getAllRatingsThatUserRated } from "../ajax/ratings";
import { refetchUser } from "../ajax/auth";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: Number(this.props.match.params.id),
      rating: 5,
      alreadyRated: false,
      ratingSubmitted: false,
    }
  }

  // allows the messages to be viewed from the most recent
  scrollToBottom = () => {

  }

  // allow user to add a new message
  addNewMessage = (content) => {
    if(localStorage.JWT_TOKEN){
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        const newMessage = {
          type: "postMessage",
          text: content,
          first_name: user.first_name,
          email: user.email,
          sender: user.id,
          recipient: this.state.id
        }

        this.socket.send(JSON.stringify(newMessage));
        axios.post('/api/newMessage', {
          sender: user.id,
          recipient: this.state.id,
          message: content,
        }).then(messages => {
        })
      })
    }
  }

  addNewRating = async (e) => {
    if(localStorage.JWT_TOKEN){
      let userObj = await refetchUser({token: localStorage.JWT_TOKEN})
      e.preventDefault();
      this.setState({ ratingSubmitted: true })
      return axios.post("/api/ratings", {
        rater: userObj.id,
        ratee: this.state.id,
        rating: this.state.rating
      })
    }
  }

  checkIfRated = async (rater, ratee) => {
    this.setState({ alreadyRated: false})
    let AllRatingsOfRater = await getAllRatingsThatUserRated(rater)
    AllRatingsOfRater.forEach(e => {
      if (e.rater === rater && e.ratee === ratee) {
        return this.setState({ alreadyRated: true})
      }
    })
  }

  handleRatingChange = e => {
    this.setState({
      "rating": e
    });
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
      let createMessage = { text: data.text, first_name: data.first_name, email: data.email };

      switch (data.type) {
        // adds new message to pre-existing messages
        case "incomingMessage":
          this.setState({ messages: this.state.messages.concat([createMessage]) })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type: " + data.type);
      }
    }
    //check if logged in
    if(localStorage.JWT_TOKEN){
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        this.checkIfRated(user.id, this.state.id)
        getFilteredMessages(user.id, this.state.id)
        .then(messages => {
          this.setState({
          messages
          })
        });
      })
    }else{
      //if user is not logged in, redirect to login page
      this.setState({redirect: true})
    }

    //get the username of the other user connected to chat
    getUsernameById(this.state.id, localStorage.JWT_TOKEN)
    .then(userInfo => {
      this.setState({
        chatPartner: userInfo,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to="/login" /> }

        <div className="chat-container">
          <header>
            <div>
              <div>Chatting with:</div>
              <div className="username">
                {this.state.chatPartner &&
                  this.state.chatPartner.first_name
                }
              </div>
            </div>
            <div className="rating-outer-container">
              {
                (!this.state.ratingSubmitted) ?
                (!this.state.alreadyRated &&
                  <RatingsForm
                    addNewRating={this.addNewRating}
                    handleRatingChange={this.handleRatingChange}
                    rating={this.state.rating}
                    ratingSubmitted={this.state.ratingSubmitted}
                  />
                ) :
                (<div>Rating submitted!</div>)
              }
            </div>
          </header>
          {this.state.messages &&
            <MessageList messages={this.state.messages} currentUserId={this.state.id} />
          }

          <ChatBar addNewMessage={this.addNewMessage} />
        </div>
      </div>
    )
  }
}

export default Chat