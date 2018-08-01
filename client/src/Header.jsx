import React from "react";
import { Link } from "react-router-dom";
import hamburger from "./icons/hamburger.png";

function Header(props){
  return (
    <header className="header-top">
      <button className="toggle-nav" onClick={props.hamburgerClickHandler}>
        <img src={hamburger}/>
      </button>
      {props.user &&
        <div>
          Signed in as: {props.user.email}
        </div>
      }
      <Link to={"/"}>
        <h1 className="App-title">Title</h1>
      </Link>
      { !props.user &&
        <div>
          <Link to={"/login"}>
            <button className="login-button">Login</button>
          </Link>
          <Link to={"/signup"}>
            <button className="login-button">Signup</button>
          </Link>
        </div>
      }
      { props.user &&
        <Link to={"/logout"}>
          <button className="login-button">Logout</button>
        </Link>
      }
    </header>
  )
}

export default Header