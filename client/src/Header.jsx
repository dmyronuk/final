import React from "react";
import { Link } from "react-router-dom";

function Header(props){
  return (
    <header className="header-top">
      <button className="toggle-nav" onClick={props.hamburgerClickHandler}>
        Toggle Nav
      </button>

      <Link to={"/"}>
        <h1 className="App-title">Title</h1>
      </Link>
      <Link to={"/login"}>
        <button className="login-button">Login</button>
      </Link>
      <Link to={"/logout"}>
        <button className="login-button">Logout</button>
      </Link>
      <Link to={"/signup"}>
        <button className="login-button">Signup</button>
      </Link>
    </header>
  )
}

export default Header