import React, { Component } from "react";
import RentalGridCard from "./RentalGridCard";
import RentalSearchForm from "./SearchForm";
import { getAllListings, getAllListingsFromQuery } from "../ajax/listings"

class RentalsGrid extends Component{
  constructor(props){
    super(props)
  }

  handleSearchSubmit = (queryObj) => {
    getAllListingsFromQuery(queryObj)
    .then(listings => {
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