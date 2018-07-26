import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 43.6932, lng: -79.3832 }} />}
  </GoogleMap>
))




export default MyMapComponent;