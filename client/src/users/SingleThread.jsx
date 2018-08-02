import React from "react";
import { Link } from "react-router-dom";

const SingleThread = (props) => {
    return (
      <tr>
        <td>Thread {props.theKey + 1}</td>
        <td>{props.thread.first_name}</td>
        <td>
          <Link to={"/chat/" + props.thread.id}>Link {props.thread.id}</ Link>
        </td>
      </tr>
      )
}

export default SingleThread