import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: 43.6532,
      lng: -79.3832
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "50vh", width: "50vw" }}>
        <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} >
          <AnyReactComponent key={1} lat={43.6532} lng={-79.3832} text="Marker 1"/>
          <AnyReactComponent key={2} lat={43.7132} lng={-79.4132} text="Marker 2"/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;