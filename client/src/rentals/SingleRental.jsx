import React, { Component } from "react";
import { getSingleListing } from "../ajax/listings";
import YelpSearch from "../yelp/YelpSearch";
import dateFromTimestamp from "../helpers/time-formatters";

class SingleRental extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
    }
  }

  componentDidMount(){
    getSingleListing(this.state.id)
    .then(data => {
      const formattedDate = dateFromTimestamp(data.date_available);
      this.setState({
        data,
        formattedDate,
      })
    })
  }

  render(){

    return (
      <div className="default-flex-row-container">
        <div className="single-rental-card">
          <div>
            <img src="/images/house.jpg" />
          </div>
          {this.state.data &&
            <div className="rental-card-info">

              <div>{this.state.data.street}</div>
              <div>{this.state.data.city} {this.state.data.province}</div>
              <div>{this.state.data.postal_code}</div>
              <div>${this.state.data.price / 100}</div>
              <div>Available: {this.state.formattedDate}</div>
              <div>{this.state.data.description}</div>
              <div>Bedrooms: {this.state.data.bedrooms} Bathrooms: {this.state.data.bathrooms} </div>
              <YelpSearch
                latitude = {this.state.data.lat}
                longitude = {this.state.data.lng}
                radius = {"5000"}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}


export default SingleRental;
