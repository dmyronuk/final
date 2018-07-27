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
    .then(listing => {
      this.setState({
        listing
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams !== nextProps.routeParams) {
      this.props.fetchArticles();
    }
  }

  render(){
    return (
      <div className="home-card">
        {this.state.listing &&
          this.state.listing.address
        }
      </div>
    )
  }
}


export default SingleRental;
