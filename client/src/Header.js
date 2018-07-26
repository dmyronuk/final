import React from "react";
import { Link } from "react-router-dom"

function Header(){
  return (
    <header className="header-top">
      <Link to={"/"}>
        <h1 className="App-title">Title</h1>
      </Link>
    </header>
  )
}


export default Header