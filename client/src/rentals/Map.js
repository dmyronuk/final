import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const listingMarkers = props.listings.map((elem, i) => {
    let position = { lat: elem.lat, lng: elem.lng }
    return <Marker key={i} position={position} />
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

export default MyMapComponent;