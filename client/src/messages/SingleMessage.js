import React from "react";
// functional vs class based

const SingleMessage = (props) => {

  // console.log(props);
    return (
      <div>
        <span>Id: {props.message.id}</span>
        <span>name: {props.message.first_name}</span>
        <span>text: {props.message.text}</span>
      </div>
      )
}

export default SingleMessage;