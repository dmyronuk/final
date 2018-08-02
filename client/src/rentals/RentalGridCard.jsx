import React from "react";
import { Link } from "react-router-dom";

const RentalGridCard = (props) => {
return(
    <Link to={"/rentals/" + props.id}>
      <div className="listing-grid-card">
        <img alt="Listing" src="/images/house.jpg" />
        <div className="listing-grid-info">
          <div className="listing-grid-address">{props.data.street}, {props.data.city}</div>
          <div>{props.data.bedrooms} Bedrooms | {props.data.bathrooms} Bathrooms | ${props.data.price}</div>
        </div>
      </div>
    </ Link>
  )
};

export default RentalGridCard
