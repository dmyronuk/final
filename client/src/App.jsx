import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./navigation/Sidebar";
import Home from "./Home.jsx";
import RentalsMap from "./rentals/RentalsMap.jsx";
import RentalsGrid from "./rentals/RentalsGrid.jsx";
import NewRental from "./rentals/NewRental.jsx";
import SingleRental from "./rentals/SingleRental.jsx";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Callback from './Callback';
import Chat from "./messages/Chat.jsx";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      sidebarClass: "closed-sidebar",
    }
  }

  toggleSidebar = () => {
    const newSidebarClass = this.state.sidebarClass === "closed-sidebar" ? "opened-sidebar" : "closed-sidebar";
    this.setState({ ...this.state, sidebarClass:newSidebarClass})
    console.log(this.state)
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">
          <Header hamburgerClickHandler={this.toggleSidebar} />
          <Sidebar toggleState={this.state.sidebarClass}/>
          <Route exact path="/" component= { Home } />
          <Route exact path="/login" component= { Login } />
          <Route exact path="/rentals/map" component={ RentalsMap }/>
          <Route exact path="/rentals/grid" component={ RentalsGrid }/>
          <Route exact path="/rentals/:id(\d+)" component={ SingleRental } />
          <PrivateRoute exact path="/rentals/new" component={ NewRental }/>
          <Route path="/callback" component={Callback} />
          <Route exact path="/chat" component={ Chat }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
