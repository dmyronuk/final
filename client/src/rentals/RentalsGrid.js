import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <div className="listing-grid-item">
            {elem.address}
            {elem.photos}
            {elem.price}
          </div>
        )}
      </div>
    )
  }
}

export default RentalsGrid