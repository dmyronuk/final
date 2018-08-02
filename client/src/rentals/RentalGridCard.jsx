// import React from "react";
// import { Link } from "react-router-dom";

// const RentalGridCard = (props) => {
// return(
//     <Link to={"/rentals/" + props.id}>
//       <div className="listing-grid-card">
//         { props.data.photos ?
//           <img alt="Rental Photo" src={props.data.photos[0]} />
//           : <img alt="No Image Available" src="/images/no-image.png" />
//         }
//         <div className="listing-grid-info">
//           <div>{props.data.city}</div>
//           <div>{props.data.street}</div>
//           <div>{props.data.province}</div>
//           <div>${props.data.price}</div>
//           <div>Bedrooms: {props.data.bedrooms} Bathrooms: {props.data.bathrooms} </div>
//         </div>
//       </div>
//     </Link>
//   )
// };

// export default RentalGridCard



import React from "react";
import { Link } from "react-router-dom";

const RentalGridCard = (props) => {
return(
    <Link to={"/rentals/" + props.id}>
      <div className="listing-grid-card">
        { props.data.photos ?
          <img alt="Rental Photo" src={props.data.photos[0]} />
          : <img alt="No Image Available" src="/images/no-image.png" />
        }
        <div className="listing-grid-info">
          <div className="listing-grid-address">{props.data.street}, {props.data.city}</div>
          <div>{props.data.bedrooms} Bedrooms | {props.data.bathrooms} Bathrooms | ${props.data.price}</div>
        </div>
      </div>
    </Link>
  )
};

export default RentalGridCard
