import React from "react";
import { Link } from "react-router-dom";

const SingleThread = (props) => {
    return (
      <tr>
        <td>Thread {props.theKey + 1}</td>
        <td>{props.thread.first_name}</td>
        <td>
          <Link to={{pathname:`/chat/${props.thread.id}`, state:{id:props.thread.id}}}>Link {props.thread.id}</Link>
        </td>
      </tr>
      )
}

export default SingleThread