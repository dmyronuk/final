import React, { Component } from "react";
import { getAllMessages } from "../ajax/messages";
import  SingleMessage from "./SingleMessage";

class AllMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getAllMessages()
    .then(messages => {
      console.log(messages);
      this.setState({
        messages
      });
    });
  }

  render () {
    return (
      <div>
        {this.state.messages && this.state.messages.map((data, i) =>
          <SingleMessage key={i} message={data}/>
        )}
      </div>
    )
  }
}

export default AllMessages