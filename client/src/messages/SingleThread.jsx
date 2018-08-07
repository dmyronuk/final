import React from "react";
import { Link } from "react-router-dom";
import MessageIcon from "../icons/message_icon2.png"

const SingleThread = (props) => {
  return (
    <tr>
      <td>{props.thread.first_name} {props.thread.last_name}</td>
      <Link to={{pathname:`/messages/${props.thread.id}`, state:{id:props.thread.id}}}>
        <td>
          <img alt="Message Link" className="thread-message-icon" src={ MessageIcon } />
        </td>
      </Link>
    </tr>
  )
}

export default SingleThread;