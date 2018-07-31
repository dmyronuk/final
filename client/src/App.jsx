import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./navigation/Sidebar";
import Home from "./Home.jsx";
import RentalsMap from "./rentals/RentalsMap.jsx";
import RentalsGrid from "./rentals/RentalsGrid.jsx";
import NewRentalForm from "./rentals/NewRentalForm.jsx";
import EditRentalForm from "./rentals/EditRentalForm.jsx";
import SingleRental from "./rentals/SingleRental.jsx";
import Login from "./users/Login";
import Logout from "./users/Logout";
import Signup from "./users/Signup";
import PrivateRoute from "./PrivateRoute";
import Chat from "./messages/Chat.jsx";
import Profile from  './users/Profile';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      sidebarClass: "closed-sidebar",
      user: null,
    }
  }

  toggleSidebar = () => {
    const newSidebarClass = this.state.sidebarClass === "closed-sidebar" ? "opened-sidebar" : "closed-sidebar";
    this.setState({ ...this.state, sidebarClass:newSidebarClass})
    console.log(this.state)
  }

  setUser = (userObj) => {
    this.setState({ user: userObj })
  }

  clearUser = () => {
    this.setState({ user: null })
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">
          <Header user={this.state.user} hamburgerClickHandler={this.toggleSidebar} />
          <Sidebar toggleState={this.state.sidebarClass}/>
          <Route exact path="/" component= { Home } />
          <Route exact path="/login" render={() => <Login setUser={this.setUser} />}/>
          <Route exact path="/logout" render={() => <Logout clearUser={this.clearUser} />} />
          <Route exact path="/signup" render={() => <Signup setUser={this.setUser} />} />
          <Route exact path="/rentals/map" component={ RentalsMap }/>
          <Route exact path="/rentals/grid" component={ RentalsGrid }/>
          <Route exact path="/rentals/:id(\d+)" component={ SingleRental } />
          <Route exact path="/rentals/new" render={() => <NewRentalForm user={this.state.user} />} />
          <Route exact path="/chat" component={ Chat }/>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/rentals/:id/edit" component={ EditRentalForm } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
