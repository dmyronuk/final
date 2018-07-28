import React, { Component } from "react";
import RentalGridCard from "./RentalGridCard";
import { getAllListings } from "../ajax/listings"

class RentalsGrid extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
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
      <div className="listing-grid-container">
        {this.state.listings && this.state.listings.map((elem, i) =>
          <RentalGridCard
            key={i}
            id={elem.id}
            data={elem}
          />
        )}
      </div>
    )
  }
}

export default RentalsGrid