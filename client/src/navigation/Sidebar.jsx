import React from "react";
import { Link } from "react-router-dom";
import MapIcon from "../icons/map_icon1.png";
import GridIcon from "../icons/grid_icon2.png";
import MessagesIcon from "../icons/message_icon1.png";
import NewRentalIcon from "../icons/new_house_icon2.png";

const Sidebar = (props) => {
  return(
    <div className={"sidebar " + props.toggleState}>
      <Link to="/rentals/grid" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Grid Icon" src={ GridIcon } id="grid-icon" />
          </div>
          <div>Grid View</div>
        </div>
      </Link>
      <Link to="/rentals/map" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Map Icon" src={ MapIcon } id="map-icon" />
          </div>
          <div>Map View</div>
        </div>
      </Link>
      <Link to="/messages" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Messages Icon" src={ MessagesIcon } id="messages-icon" />
          </div>
          <div>Messages</div>
        </div>
      </Link>

      { isLoggedIn() &&
        <Link to={"/rentals/new"} onClick={props.linkClickHandler}>
          <div className="sidebar-item">
            <div className="img-container">
              <img alt="new-rental-icon" src={ NewRentalIcon } />
            </div>
            <div>Add Rental</div>
          </div>
        </Link>
      }
    </div>
  )
}

export default Sidebar