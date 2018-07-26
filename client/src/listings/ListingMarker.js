import React from "react";
import { Marker } from "react-google-maps";
import MarkerIcon from "./images/marker.png";

const ListingMarker = (props) => {
  var image = {
    url: "./images/marker.png",
    // scaledSize: new google.maps.Size(31, 43)
  };

  return (
    <Marker
      position={props.position}
      icon={image}
    >
    </Marker>
  )
}

export default ListingMarker