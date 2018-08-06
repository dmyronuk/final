import React from "react";
import { Marker } from "react-google-maps";
import { Link } from "react-router-dom";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
// import icon from "../images/house-pin.png";

const RentalMarker = (props) => {

  return (
    <Marker position={props.position} onClick={() => props.handleMarkerClick(props.id)} >
      {props.showInfoBox && <InfoBox>
        <div className="info-box">
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            <div>{props.address}</div>
            <Link to={"/rentals/" + (props.id+1)}>link</Link>
          </div>
        </div>
      </InfoBox>}
    </Marker>
  )
}

export default RentalMarker