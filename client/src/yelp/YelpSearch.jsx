import React, { Component } from "react";
import { categorySearchByLocation } from "../ajax/yelp"
import EducationIcon from "../icons/education_icon1.png";
import RestaurantIcon from "../icons/wine.png";


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
      this.props.setYelpData(data)
    })
  }

  componentDidMount(){
    console.log(this.state)
  }

  render(){
    return (
      <div className="yelp-search-container">
        <button className="yelp-button" onClick={ () => this.searchClickHandler("restaurants")}>
          <img alt="Search restaurants" src={ RestaurantIcon } />
        </button>
        <button className="yelp-button" onClick={ () => this.searchClickHandler("entertainment")}>
          <img alt="Search entertainment" src={ RestaurantIcon } />
        </button>
        <button className="yelp-button" onClick={ () => this.searchClickHandler("education")}>
           <img alt="Search education" src={ EducationIcon } />
        </button>
      </div>
    )
  }
}

export default YelpSearch