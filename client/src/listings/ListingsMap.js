import React, { Component } from "react";
import MyMapComponent from "./Map";
import ListingMapCard from "./ListingMapCard";

class Listings extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  getAllListings = async () => {
      const response = await fetch("/listings");
      const data = await response.json();
      if (response.status !== 200){
        throw Error(data.message)
      }
      return JSON.parse(data)
    }


   componentDidMount(){
    this.getAllListings()
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
              <ListingMapCard
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

export default Listings