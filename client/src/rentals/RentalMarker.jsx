import React from "react";
import { Marker } from "react-google-maps";
import { Link } from "react-router-dom";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
// import icon from "../images/house-pin.png";

const RentalMarker = props => {
  return (
    <Marker
      position={props.position}
      onMouseOver={() => props.handleMarkerClick(props.id)}
      onClick={() => props.toggleMarker(props.id)}
    >
      {props.showInfoBox &&
        props.showListingBox && (
          <InfoBox>
            <div className="info-box">
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                <Link to={"/rentals/" + (props.id + 1)}>
                  <strong>
                    {props.address}
                  </strong>

                  <img
                    src={props.photo}
                    alt="Listing"
                    style={{
                      height: "100%",
                      width: "100%"
                    }}
                  />
                  <em> ${props.price} / month </em>
                  <div style={{ fontSize: "0.9rem" }}>
                    {props.bedrooms} Bed
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    {props.bathrooms} Bath
                  </div>

                  <div />
                </Link>
              </div>
            </div>
          </InfoBox>
        )}
    </Marker>
  );
};

export default RentalMarker;
