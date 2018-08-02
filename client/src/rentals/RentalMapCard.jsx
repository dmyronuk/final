import React from "react";
import { Link } from "react-router-dom";
import dateFromTimestamp from "../helpers/time-formatters";

const RentalMapCard = (props) => {
  const date = dateFromTimestamp(props.data.date_available);

  return(
      <Link to={"/rentals/" + props.id}>
        <div className="listing-map-card">
          <div className="listing-map-img-container">
            <img alt="Listing" src="/images/house.jpg" />
          </div>
          <div className="listing-map-info-container">
            <h4>{props.data.street}, {props.data.city}</h4>
            <div>{props.data.bedrooms} Bedrooms</div>
            <div>{props.data.bathrooms} Bathrooms</div>
            <div>${props.data.price}</div>
            <div>Available {date}</div>
          </div>
        </div>
      </Link>
    )
  };

export default RentalMapCard
