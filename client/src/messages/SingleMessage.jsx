import React from "react";

const SingleMessage = (props) => {

  return (
    <div>
      <p>{props.message.first_name}: {props.message.text}</p>
    </div>
  )
}

export default SingleMessage;