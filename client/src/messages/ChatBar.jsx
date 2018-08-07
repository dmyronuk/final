import React, { Component } from 'react';

class ChatBar extends Component {
  state={
    "inputMessage": ""
  }

    // updates message when user changes it
  changeMessage = (evt) => {
    this.setState({inputMessage: evt.target.value});
  }

  render() {
  // pressing enter to submit the message
    const submitMessage = evt => {
      const newMessageInput = evt.target;
      if (evt.key === "Enter" && this.state.inputMessage !== "") {
        this.props.addNewMessage(this.state.inputMessage);
        this.setState({inputMessage: ""})
        newMessageInput.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input
          className="chatbar-message"
          onChange = {this.changeMessage}
          onKeyPress= {submitMessage}
          placeholder="Type a message"
          autoFocus
          />
      </footer>
    )
  }
}

export default ChatBar;


