import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import Header from "./Header";
import Listings from "./Listings";
import Home from "./Home";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">
          <Header />
          <Route exact path="/" component= { Home } />
          <Route exact path="/listings" component={ Listings }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
