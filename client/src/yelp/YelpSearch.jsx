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
  searchClickHandler = (term) => {
    //searchRequest object should contain latitude str, longitude str, radius str, term str
    let searchRequest = Object.assign({ term }, this.state)
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
      <div>
        <button onClick={ () => this.searchClickHandler("restaurants")}>Restaurants</button>
        <button onClick={ () => this.searchClickHandler("entertainment")}>Entertainment</button>
        <button onClick={ () => this.searchClickHandler("education")}>Education</button>
      </div>
    )
  }
}

export default YelpSearch