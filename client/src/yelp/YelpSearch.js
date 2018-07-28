import React, { Component } from "react";
import { categorySearchByLocation } from "../ajax/yelp"

class YelpSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: props.latitude,
      longitude: props.longitude,
      radius: props.radius,
    }
  }

  //Yelp Search
  searchClickHandler = () => {
    //searchRequest object should contain latitude str, longitude str, radius str, term str
    let searchRequest = Object.assign({term: "restaurants"}, this.state)
    categorySearchByLocation(searchRequest)
    .then(data => {
      console.log("YELP DATA:    ", data);
      this.setState({
        yelpData: data
      })
    })
  }

  componentDidMount(){
    console.log(this.state)
  }

  render(){
    return (
      <button onClick={this.searchClickHandler}>Search</button>
    )
  }
}

export default YelpSearch