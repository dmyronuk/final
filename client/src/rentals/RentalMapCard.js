import React from "react";
import { Link } from "react-router-dom";

const RentalMapCard = (props) => {
return(
    <Link to={`/rentals/1`}>
      <div className="home-card">
        <img alt="Listing" src="../../public/images/house.jpg" />
          <table>
            <tbody>
              <tr>
                <td>{props.address}</td>
              </tr>
              <tr>
                <td>{props.price}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </ Link>
  )
};

export default RentalMapCard
