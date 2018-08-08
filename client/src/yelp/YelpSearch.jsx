import React, { Component } from "react";
import { categorySearchByLocation } from "../ajax/yelp"
import EducationIcon from "../icons/education_icon1.png";
import EntertainmentIcon from "../icons/entertainment_icon1.png";
import RestaurantIcon from "../icons/fork_knife.png";

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
      //yelp data is saved in SingleRental component state for display
      this.props.setYelpData(data, term)
    })
  }

  render(){
    return (
      <div className="yelp-search-container">
        <button onClick={ () => this.searchClickHandler("restaurants")}>
          <img alt="Search restaurants" src={ RestaurantIcon } />
        </button>
        <button onClick={ () => this.searchClickHandler("entertainment")}>
          <img alt="Search entertainment" src={ EntertainmentIcon } />
        </button>
        <button onClick={ () => this.searchClickHandler("education")}>
           <img alt="Search education" src={ EducationIcon } />
        </button>
      </div>
    )
  }
}

export default YelpSearch