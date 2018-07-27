import React, { Component } from "react";
import { getAllListings } from "../ajax/listings"

class ListingsGrid extends Component{
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

export default ListingsGrid