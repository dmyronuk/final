import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            address={elem.address}
            photos={elem.photos}
            price={elem.price}
          />
        )}
      </div>
    )
  }
}

export default RentalsGrid