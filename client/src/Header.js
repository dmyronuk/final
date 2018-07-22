import React from "react";
import { Link } from "react-router-dom"

function Header(){
  return (
    <header className="header-top">
      <Link to={"/students"}>
        <h1 className="App-title">Scheduler</h1>
      </Link>
    </header>
  )
}


export default Header