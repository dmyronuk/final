import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import RentalsMap from "./listings/RentalsMap";
import RentalsGrid from "./listings/RentalsGrid";
import NewRental from "./listings/NewRental"
import SingleRental from "./listings/SingleRental"

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
          <Route exact path="/rentals/map" component={ RentalsMap }/>
          <Route exact path="/rentals/grid" component={ RentalsGrid }/>
          <Route exact path="/rentals/new" component={ NewRental }/>
          <Route path="rentals/:id" component={ SingleRental } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
