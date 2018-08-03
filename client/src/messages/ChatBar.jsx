import React, { Component } from 'react';

class ChatBar extends Component {
  state={
    "inputMessage": ""
  }

    // updates message when user changes it
  changeMessage = (evt) => {
    // console.log(evt.target.value);
    this.setState({inputMessage: evt.target.value});
  }

  render() {
  // pressing enter to submit the message
    const submitMessage = evt => {
      const newMessageInput = evt.target;
      if (evt.key === "Enter" && this.state.inputMessage !== "") {
        // console.log(newMessageInput);
        this.props.addNewMessage(this.state.inputMessage);
        newMessageInput.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input
          className="chatbar-message"
          onChange = {this.changeMessage}
          onKeyPress= {submitMessage}
          placeholder="Type a message" />
      </footer>
    )
  }
}

export default ChatBar;


