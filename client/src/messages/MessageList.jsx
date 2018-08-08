import React, { Component } from "react";
import  SingleMessage from "./SingleMessage.jsx";

class MessageList extends Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="message-list">
        <ul>
          {
            this.props.messages.map((data, i) => {
              //Class to distinguish the current user's messages from chat partner's messages in the UI
              const msgClassname = data.id !== this.props.currentUserId ?  "cur-user-msg" : "other-user-msg";
              return <SingleMessage key={i} message={data} msgClassname={msgClassname}/>
            })
          }
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </ul>
      </div>
    )
  }
}

export default MessageList;