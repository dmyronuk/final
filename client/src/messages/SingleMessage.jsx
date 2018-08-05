import React from "react";

const SingleMessage = (props) => {
  return (
    <li>
      <div className={"chat-msg " + props.msgClassname}>
        <div className={"username-container"}>
          {props.message.first_name}
        </div>
        <div>
          <p>{props.message.text}</p>
        </div>
      </div>
    </li>
  )
}

export default SingleMessage;