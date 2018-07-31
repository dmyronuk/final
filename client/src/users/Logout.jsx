import React from "react";
import { Redirect } from "react-router-dom";


class Logout extends React.Component {

  componentDidMount(){
    localStorage.removeItem("JWT_TOKEN");
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default Logout