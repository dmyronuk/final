import React, { Component } from "react";
import RentalGridCard from "./RentalGridCard.jsx";
import RentalSearchForm from "./SearchForm.jsx";
import { getAllListings, getSingleListing } from "../ajax/listings"

class RentalsGrid extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  handleSearchSubmit = (query) => {
    getSingleListing(1)
    .then(listings => {
      console.log(listings)
      this.setState({
        listings
      })
    })
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
        <RentalSearchForm handleSearchSubmit={this.handleSearchSubmit} />
        <div className="listing-grid-container">
          {this.state.listings && this.state.listings.map((elem, i) =>
            <RentalGridCard
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

export default RentalsGrid