import React, { Component } from "react";
import MapComponent from "./Map.jsx";
import RentalMapCard from "./RentalMapCard.jsx";
import { getAllListings } from "../ajax/listings"

class RentalsMap extends Component{
  constructor(props){
    super(props)
    this.state = {
      activeInfoBoxId: null,
    }
  }

  handleMarkerClick = (key) => {
    this.setState({
      activeInfoBoxId: key
    })
  }

  componentDidMount(){
    getAllListings()
    .then(listings => {
      console.log(listings)
      this.setState({
        listings
      })
    })
  }

  render(){
    return(
      <div>
        {this.state.listings &&
          <MapComponent
            listings = {this.state.listings}
            googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div  />}
            containerElement = {<div className="map-container" />}
            mapElement = {<div style={{ height: `100%` }} />}
            handleMarkerClick = { this.handleMarkerClick }
            activeInfoBoxId = { this.state.activeInfoBoxId }
          />
        }
        <div className ="map-listings-container">
          {this.state.listings && this.state.listings.map((elem, i) =>
              <RentalMapCard
                key={i}
                id={elem.id}
                data={elem}
              />
          )}
        </div>
      </div>
    )
  }
}

export default RentalsMap