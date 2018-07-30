import React, { Component } from "react";
// import { getAllMessages } from "../ajax/messages";
import  SingleMessage from "./SingleMessage.jsx";

class MessageList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  componentDidMount() {
    // console.log(this.props.messages);

    // getAllMessages()
    // .then(messages => {
    //   console.log(messages);
    //   this.setState({
    //     messages
    //   });
    // });
  }
        // {this.state.messages && this.state.messages.map((data, i) =>
        //   <SingleMessage key={i} message={data}/>
        // )}

  render() {
    return (
      <div>
       {this.props.messages.map((data, i) => {
          return <SingleMessage key={i} message={data}/>
       })}
      </div>
    )
  }
}

export default MessageList