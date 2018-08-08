import React from "react";
import { Link } from "react-router-dom";
import hamburger from "./icons/hamburger.png";
import kiroIcon from "./icons/kiro_logo3.png";

function Header(props) {
  return (
    <header className="header-top">
      <button alt="Sidebar Toggle Button" className="toggle-nav" onClick={props.hamburgerClickHandler}>
        <img alt="Menu Toggle" src={hamburger}/>
      </button>
      <Link to={"/"}>
        <h1 className="app-title">
          <span className="app-title-part1">K</span>
          <span className="app-title-part2">i</span>
          <span className="app-title-part3">r</span>
          <span className="app-title-part4">o</span>
          <img alt="Logo" src={kiroIcon}/>
        </h1>
      </Link>
        <div className="nav-login-container">
          { !props.user ?
            <span>
                <Link to={"/login"}>
                  <button className="default-auth-button">Login</button>
                </Link>
                <Link to={"/signup"}>
                  <button className="default-auth-button">Signup</button>
                </Link>
            </span>
          :
            <div>
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