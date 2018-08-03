import React, { Component } from "react";
import { getFilteredMessages } from "../ajax/messages";
import { getAllRatingsThatUserRated } from "../ajax/ratings";
import MessageList from "./MessageList.jsx";
import RatingsForm from "./RatingsForm.jsx";
import ChatBar from "./ChatBar.jsx";
import axios from 'axios';
import { refetchUser } from "../ajax/auth";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Number(this.props.match.params.id),
      rating: 5,
      alreadyRated: false,
      ratingSubmitted: false,
    }
  }

  // allows the messages to be viewed from the most recent
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  // allow user to add a new message
  addNewMessage = (content) => {
    console.log(content);
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

  getUserIDFromState = () =>{
    this.setState({user:this.props.user})
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
     if(localStorage.JWT_TOKEN){
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        this.checkIfRated(user.id, this.state.id)
        getFilteredMessages(user.id, this.state.id)
        .then(messages => {
          this.setState({
          messages
        })
        // console.log(messages);
      });
      })
    }
  }



  render() {
    return (
      <div>
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