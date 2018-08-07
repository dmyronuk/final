import React from "react";
import { Link } from "react-router-dom";
import numberWithCommas from "../helpers/number-formatters";

const RentalGridCard = (props) => {
return(
    <Link to={"/rentals/" + props.id}>
      <div className="listing-grid-card">
        <div className="listing-grid-photo-container">
          { props.data.photos[0] ?
            <img alt="Rental Property" src={props.data.photos[0]} />
            : <img alt="Not Available" src="/images/no-image.jpg" />
          }
        </div>
        <div className="listing-grid-info">
          <div className="listing-grid-address">{props.data.street}, {props.data.city}</div>
          <div>{props.data.bedrooms} Bedrooms | {props.data.bathrooms} Bathrooms | ${numberWithCommas(props.data.price)}</div>
        </div>
      </div>
    </Link>
  )
};

export default RentalGridCard
