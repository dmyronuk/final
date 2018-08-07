import React, { Component } from "react";
import MapComponent from "./Map";
import RentalMapCard from "./RentalMapCard";
import RentalSearchForm from "./SearchForm";
import { getAllListings, getAllListingsFromQuery } from "../ajax/listings"

class RentalsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showListingBox: false,
      activeInfoBoxId: null,
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
    }
  }

  handleSearchSubmit = (queryObj) => {
    getAllListingsFromQuery(queryObj)
      .then(listings => {
        const noResults = listings.length === 0;
        this.setState({
          listings,
          noResults,
        })
      })
  }

  toggleMarker = (key) => {
    this.handleMarkerClick(key)
    this.setState({ showListingBox: true, clickedMarker: true }, () => {
    })
  }

  removeListingBoxFromMap = () => {
    const clickedMarker = this.state.clickedMarker;
    if (clickedMarker === true) {
      this.setState({ clickedMarker: false }, () => {
      })
    } else {
      this.setState({ showListingBox: false })
    }
  }

  handleMarkerClick = (key) => {
    this.setState({
      activeInfoBoxId: key
    })
  }

  componentDidMount() {
    document.title = `Map View | Kiro`
    getAllListings()
    .then(listings => {
      this.setState({
        listings
      })
    })
  }


  render() {

    return (
      <div>
        <RentalSearchForm handleSearchSubmit={this.handleSearchSubmit} />
        {this.state.listings &&
          <MapComponent
            listings={this.state.listings}
            googleMapURL={this.state.googleMapURL}
            loadingElement={<div />}
            containerElement={<div className="map-container" onClick={this.removeListingBoxFromMap} />}
            mapElement={<div style={{ height: `100%` }} />}
            handleMarkerClick={this.handleMarkerClick}
            activeInfoBoxId={this.state.activeInfoBoxId}
            showListingBox={this.state.showListingBox}
            toggleMarker={this.toggleMarker}
            removeListingBoxFromMap={this.removeListingBoxFromMap}
          />
        }
        <div className="map-listings-container">
          {this.state.listings && this.state.listings.map((elem, i) =>
            <RentalMapCard
              key={i}
              id={elem.id}
              data={elem}
            />
          )}
          {this.state.noResults &&
            <div className="no-results">No Results</div>
          }
        </div>
      </div>
    )
  }
}

export default RentalsMap