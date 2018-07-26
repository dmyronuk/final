import React, { Component } from "react";
import MyMapComponent from "./Map";

class Listings extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  // getAllStudentInfo = async () => {
  //     const response = await fetch("/students");
  //     const data = await response.json();
  //     if (response.status !== 200){
  //       throw Error(data.message)
  //     }
  //     return data
  //   }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        Listings
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div  />}
          containerElement={<div className="map-container" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default Listings