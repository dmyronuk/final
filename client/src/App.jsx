import React, { Component, createContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Chat from "./messages/Chat.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import NotFound from "./NotFound.jsx";
import NewRentalForm from "./rentals/NewRentalForm.jsx";
import EditRentalForm from "./rentals/EditRentalForm.jsx";
import Login from "./users/Login";
import Logout from "./users/Logout";
import PageMask from "./PageMask"
import MyMessages from  "./messages/MyMessages";
import RentalsGrid from "./rentals/RentalsGrid.jsx";
import RentalsMap from "./rentals/RentalsMap.jsx";
import Sidebar from "./navigation/Sidebar";
import Signup from "./users/Signup";
import SingleRental from "./rentals/SingleRental.jsx";
import { refetchUser } from "./ajax/auth";

// context
// import AppProvider from "./provider.jsx";
// import AppContext from "./provider.jsx";



let UserContext = React.createContext()

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      sidebarClass: "closed-sidebar",
      maskClass: "hidden-mask",
      user: false,
    }
  }

  toggleSidebar = () => {
    const newSidebarClass = this.state.sidebarClass === "closed-sidebar" ? "opened-sidebar" : "closed-sidebar";
    const newMaskClass = this.state.maskClass === "hidden-mask" ? "visible-mask" : "hidden-mask";
    this.setState({ ...this.state, sidebarClass: newSidebarClass, maskClass: newMaskClass});
  }

  setUser = (userObj) => {
    this.setState({ user: userObj });
  }

  clearUser = () => {
    this.setState({ user: null });
  }

  componentDidMount(){
    if(localStorage.JWT_TOKEN){
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        this.setUser(user);
      })
    }
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">


          <PageMask toggleState={ this.state.maskClass} maskClickHandler={ this.toggleSidebar }/>
          <Header user={this.state.user} hamburgerClickHandler={ this.toggleSidebar } />
          <Sidebar toggleState={this.state.sidebarClass} linkClickHandler={ this.toggleSidebar }/>

          <Switch>
            <Route exact path="/login" render={() => <Login setUser={this.setUser} />}/>
            <Route exact path="/logout" render={() => <Logout clearUser={this.clearUser} />} />
            <Route exact path="/signup" render={() => <Signup setUser={this.setUser} />} />
            <Route exact path="/rentals/map" component={ RentalsMap }/>
            <Route exact path="/rentals/grid" component={ RentalsGrid }/>
            <Route exact path="/rentals/:id(\d+)" component={ SingleRental } />
            <Route exact path="/rentals/new" render={() => <NewRentalForm user={this.state.user} />} />
            <Route exact path="/rentals/:id/edit" component={ EditRentalForm } />
            <Route exact path="/messages/:id(\d+)" component= { Chat }/>
            <Route exact path="/messages" component={MyMessages} />
            <Route exact path="/" component= { Home } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
