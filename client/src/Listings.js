import React, { Component } from "react";
import MyMapComponent from "./Map";

class Listings extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  // getAllListings = async () => {
  //     const response = await fetch("/listings");
  //     const data = await response.json();
  //     if (response.status !== 200){
  //       throw Error(data.message)
  //     }
  //     return data
  //   }

  getAllListings(){
    this.setState({
      listings:[
        {
          address: "123 Drury Lane",
          photos:[],
          price: "$1800",
          lat: 43.6732,
          lng: -79.3832,
        },
        {
          address: "123 Drury Lane",
          photos:[],
          price: "$1800",
          lat: 43.6932,
          lng: -79.3832,
        },
      ]
    })
  }

  componentDidMount(){
    this.getAllListings();
  }

  render(){
    return(
      <div>
        Listings
        <MyMapComponent
          listings = {this.state.listings}
          googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement = {<div  />}
          containerElement = {<div className="map-container" />}
          mapElement = {<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default Listings