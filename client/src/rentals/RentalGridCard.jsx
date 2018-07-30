import React from "react";
import { Link } from "react-router-dom";

const RentalGridCard = (props) => {
return(
    <Link to={"/rentals/" + props.id}>
      <div className="grid-listing-card">
        <img alt="Listing" src="../../public/images/house.jpg" />
        <div>
          <div>{props.data.city}</div>
          <div>{props.data.street}</div>
          <div>{props.data.province}</div>
          <div>${props.data.price}</div>
          <div>Bedrooms: {props.data.bedrooms} Bathrooms: {props.data.bathrooms} </div>
        </div>
      </div>
    </ Link>
  )
};

export default RentalGridCard
