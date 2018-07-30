import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/AuthService";
const Sidebar = (props) => {
  return(
    <div className={"sidebar " + props.toggleState}>
      <div>
        <Link to="/rentals/grid">Rentals Grid</Link>
      </div>
      <div>
        <Link to="/rentals/map">Rentals Map</Link>
      </div>
      <div>
        <Link to="/messages">Messages</Link>
      </div>

      { isLoggedIn() &&
        <div>
          <Link to={"/rentals/new"}>
            <button >New listing</button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Sidebar