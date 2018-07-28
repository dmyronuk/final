import React, { Component } from "react";
import { getSingleListing } from "../ajax/listings"

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
      this.setState({
        data
      })
      console.log(data)
    })

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams !== nextProps.routeParams) {
      this.props.fetchArticles();
    }
  }

  render(){
    return (
      <div className="single-home-card">
        {this.state.data &&
          <div>
            <div>{this.state.data.street}</div>
            <div>{this.state.data.city} {this.state.data.province}</div>
            <div>{this.state.data.postal_code}</div>
            <div>${this.state.data.price / 100}</div>
            <div>{this.state.data.date_available}</div>
            <div>{this.state.data.description}</div>
            <div>Bedrooms: {this.state.data.bedrooms} Bathrooms: {this.state.data.bathrooms} </div>
          </div>
        }
      </div>
    )
  }
}


export default SingleRental;
