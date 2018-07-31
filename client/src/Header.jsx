import React from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from "./utils/AuthService";

function Header(props){
  return (
    <header className="header-top">
      <button className="toggle-nav" onClick={props.hamburgerClickHandler}>
        Toggle Nav
      </button>

      <Link to={"/"}>
        <h1 className="App-title">Title</h1>
      </Link>

      {(isLoggedIn()) ? (
        <Link to={"/"}>
          <button className="login-button" onClick={() => logout()}>Logout </button>
        </Link>
        ) : (
        <button className="login-button" onClick={() => login()}>Login</button>
      )}
    </header>
  )
}

export default Header