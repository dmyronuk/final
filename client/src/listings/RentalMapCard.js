import React from "react";

const RentalMapCard = (props) => {
return(
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
      <div>

      </div>
    </div>
  )
};

export default RentalMapCard
