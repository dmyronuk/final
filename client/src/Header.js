import React from "react";
import { Link } from "react-router-dom";
import { login, logout, isLoggedIn } from './utils/AuthService';

function Header(){
  return (
    <header className="header-top">
      <Link to={"/"}>
        <h1 className="App-title">Title</h1>
      </Link>
        <div>
           { 
             (isLoggedIn()) ? ( <button onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
        </div>
    </header>
  )
}


export default Header