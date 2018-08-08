import React from "react";
import { Link } from "react-router-dom";
import MapIcon from "../icons/map_icon1.png";
import GridIcon from "../icons/grid_icon2.png";
import MessagesIcon from "../icons/message_icon1.png";
import NewRentalIcon from "../icons/new_house_icon2.png";
import ProfileIcon from "../icons/user_icon1.png";

const Sidebar = (props) => {
  return (
    <div className={"sidebar " + props.toggleState}>

      <div className="profile-item">
          <div className="img-container">
            <img alt="Messages Icon" src={ ProfileIcon } id="profile-icon" />
          </div>
          {props.user && <div>Hi {props.user.first_name}</div>}
      </div>

      <Link to="/rentals/grid" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Grid Icon" src={ GridIcon } id="grid-icon" />
          </div>
          <div>Grid view</div>
        </div>
      </Link>
      <Link to="/rentals/map" onClick={props.linkClickHandler}>
        <div className="sidebar-item">
          <div className="img-container">
            <img alt="Map Icon" src={ MapIcon } id="map-icon" />
          </div>
          <div>Map view</div>
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

      { props.user &&
        <Link to={"/rentals/manage"} onClick={props.linkClickHandler}>
          <div className="sidebar-item">
            <div className="img-container">
              <img alt="new-rental-icon" src={ NewRentalIcon } id="manage-icon" />
            </div>
            <div>Manage listings</div>
          </div>
        </Link>
      }
    </div>
  )
}

export default Sidebar