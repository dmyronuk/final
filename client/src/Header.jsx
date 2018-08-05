import React from "react";
import { Link } from "react-router-dom";
import hamburger from "./icons/hamburger.png";

function Header(props){
  return (
    <header className="header-top">
      <button alt="Sidebar Toggle Button" className="toggle-nav" onClick={props.hamburgerClickHandler}>
        <img alt="Menu Toggle" src={hamburger}/>
      </button>
      <Link to={"/"}>
        <h1 className="app-title">Title</h1>
      </Link>
        <div className="nav-login-container">
          { props.user === null ?
            <div>
              <div>
                <Link to={"/login"}>
                  <button className="default-auth-button">Login</button>
                </Link>
              </div>
              <div>
                <Link to={"/signup"}>
                  <button className="default-auth-button">Signup</button>
                </Link>
              </div>
            </div>
          :
            <div>
              <div className="navbar-email">
                {props.user.email}
              </div>
              <Link to={"/logout"}>
                <button className="default-auth-button logout-button">Logout</button>
              </Link>
            </div>
          }
        </div>
    </header>
  )
}

export default Header