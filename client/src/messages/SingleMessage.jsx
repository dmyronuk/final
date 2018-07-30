import React from "react";
// functional vs class based

const SingleMessage = (props) => {

  // console.log(props);
    return (
      <div>
        <p>{props.message.first_name}: {props.message.text}</p>
      </div>
      )
}

export default SingleMessage;