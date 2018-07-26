import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import Header from "./Header";
import Home from "./Home";
import ListingsMap from "./listings/ListingsMap";
import ListingsGrid from "./listings/ListingsGrid";

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
          <Route exact path="/listings/map" component={ ListingsMap }/>
          <Route exact path="/listings/grid" component={ ListingsGrid }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
