import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/AuthService";
import MapIcon from "../icons/map_icon1.png";
import GridIcon from "../icons/grid_icon2.png";
import ProfileIcon from "../icons/user_icon2.png";
import NewRentalIcon from "../icons/new_house_icon2.png";

const Sidebar = (props) => {
  return(
    <div className={"sidebar " + props.toggleState}>
      <Link to="/rentals/grid" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <img alt="grid-icon" src={ GridIcon } />
          <div>Grid View</div>
        </div>
      </Link>
      <Link to="/rentals/map" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <img alt="map-icon" src={ MapIcon } />
          <div>Map View</div>
        </div>
      </Link>
      <Link to="/chat" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <img alt="profile-icon" src={ ProfileIcon } />
          <div>Profile</div>
        </div>
      </Link>

      { isLoggedIn() &&
        <Link to={"/rentals/new"} onClick={props.linkClickHandler}>
          <div className="sidebar-item">
            <img alt="new-rental-icon" src={ NewRentalIcon } />
            <div>Add Rental</div>
          </div>
        </Link>
      }
    </div>
  )
}

export default Sidebar