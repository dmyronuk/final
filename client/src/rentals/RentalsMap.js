import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyMapComponent from "./Map";
import RentalMapCard from "./RentalMapCard";
import { getAllListings } from "../ajax/listings"

class RentalsMap extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

   componentDidMount(){
    getAllListings()
    .then(listings => {
      this.setState({
        listings
      })
    })
  }

  render(){
    return(
      <div>
        {this.state.listings &&
          <MyMapComponent
            listings = {this.state.listings}
            googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div  />}
            containerElement = {<div className="map-container" />}
            mapElement = {<div style={{ height: `100%` }} />}
          />
        }
        <div className ="map-listings-container">
          {this.state.listings && this.state.listings.map((elem, i) =>
              <RentalMapCard
                id={elem.id}
                key={i}
                address={elem.address}
                photos={elem.photos}
                price={elem.price}
              />
          )}
        </div>
      </div>
    )
  }
}

export default RentalsMap