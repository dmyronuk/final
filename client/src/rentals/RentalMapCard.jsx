import React from "react";
import { Link } from "react-router-dom";

const RentalMapCard = (props) => {
return(
    <Link to={"/rentals/" + props.id}>
      <div className="home-card">
      { props.data.photos ?
        <img alt="Rental Photo" src={props.data.photos[0]} />
        : <img alt="No Image Available" src="/images/no-image.png" />
      }

        <div>
          <div>{props.data.street}</div>
          <div>{props.data.city}</div>
          <div>{props.data.province}</div>
          <div>${props.data.price}</div>
          <div>Bedrooms: {props.data.bedrooms} Bathrooms: {props.data.bathrooms} </div>
        </div>
      </div>
    </Link>
  )
};

export default RentalMapCard
