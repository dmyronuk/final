import React from "react";
import  SingleMessage from "./SingleMessage.jsx";

const MessageList = (props) => {
  return (
    <div>
      {
        props.messages.map((data, i) => {
          return <SingleMessage key={i} message={data}/>
        })
      }
    </div>
  )
}

export default MessageList;