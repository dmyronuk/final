import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RentalMarker from "./RentalMarker.jsx"

const MapComponent = withScriptjs(withGoogleMap((props) => {
  const listingMarkers = props.listings.map((elem, i) => {
    const position = { lat: elem.lat, lng: elem.lng }

    //If the marker's id matches the activeInfoBoxId passed down from Rentals Map
    //then set showInfoBox to true so that it is rendered
    const showInfoBox = props.activeInfoBoxId === i ? true : false;
    return (
      <RentalMarker
        key={i}
        id={i}
        position={position}
        address={elem.street + ", " + elem.city}
        handleMarkerClick = { props.handleMarkerClick }
        showInfoBox = { showInfoBox }
      />
    )
  })

  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
    >
      {props.listings && listingMarkers}
    </GoogleMap>
  )
}))

export default MapComponent;