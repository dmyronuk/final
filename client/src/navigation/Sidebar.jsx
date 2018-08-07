import React, { Component } from "react";
import { Link } from "react-router-dom";
import MapIcon from "../icons/map_icon1.png";
import GridIcon from "../icons/grid_icon2.png";
import MessagesIcon from "../icons/message_icon1.png";
import NewRentalIcon from "../icons/new_house_icon2.png";
import ProfileIcon from "../icons/user_icon2.png";
import { fetchLandlord } from "../ajax/auth.js";


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandlord: false,
    };
  }

  // checkIfLandlord = async () => {
  //   if (localStorage.JWT_TOKEN) {
  //     let landlord = await fetchLandlord({ token: localStorage.JWT_TOKEN })
  //     if (landlord.id !== false) {
  //       return true;
  //     }
  //   }
  //   return false
  // }

  // componentDidMount() {
  //   this.checkIfLandlord().then(e => {
  //     return this.setState({ isLandlord: e })
  //   })
  // }

  render() {
  
    return (
      <div className={"sidebar " + this.props.toggleState}>

        <div className="profile-item">
          <div className="img-container">
            <img alt="Messages Icon" src={ProfileIcon} id="profile-icon" />
          </div>
          <div>Grid View</div>
        </div>

        <Link to="/rentals/grid" onClick={this.props.linkClickHandler}>
          <div className="sidebar-item">
            <div className="img-container">
              <img alt="Grid Icon" src={GridIcon} id="grid-icon" />
            </div>
            <div>Grid view</div>
          </div>
          <div>Map View</div>
        </div>
      </Link>
      <Link to="/messages" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Messages Icon" src={ MessagesIcon } id="messages-icon" />
          </div>
        </Link>
        <Link to="/messages" onClick={this.props.linkClickHandler}>
          <div className="sidebar-item">
            <div className="img-container">
              <img alt="Messages Icon" src={MessagesIcon} id="messages-icon" />
            </div>
            <div>Manage Listings</div>
          </div>
        </Link>

        {this.props.user &&
          <Link to={"/rentals/manage"} onClick={this.props.linkClickHandler}>
            <div className="sidebar-item">
              <div className="img-container">
                <img alt="new-rental-icon" src={NewRentalIcon} id="manage-icon" />
              </div>
              <div>Manage listings</div>
            </div>
          </Link>
        }
      </div>
    )
  }
}

export default Sidebar