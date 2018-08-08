import React, { Component } from "react";
import searchIcon from "../icons/search.png"

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
    this.maxPrice = 6000
    this.state = {
      query: "",
      bedrooms: "Any",
      bathrooms: "Any",
      maxPrice: 6000,
      minPrice: 0,
    }
  }

  handleQueryChange = (e) => {
    const newState = Object.assign(this.state, {query: e.target.value})
    this.setState(newState);
  }

  //handles change for any dropdown selector like bedrooms, bathrooms etc
  //immediately changes state so a new query is fired off
  handleSelectChange = (e) => {
    const stateUpdateObj = {};
    stateUpdateObj[e.target.name] = e.target.value;
    const newState = Object.assign(this.state, stateUpdateObj);
    this.setState(newState);
    this.props.handleSearchSubmit(this.state);
  }

  //slider change does not fire a search on every change, unlike the select handler
  handleSliderChange = (e) => {
    const stateUpdateObj = {};
    stateUpdateObj[e.target.name] = e.target.value;
    const newState = Object.assign(this.state, stateUpdateObj);
    this.setState(newState);
  }

  handleSliderRelease = (e) => {
    this.props.handleSearchSubmit(this.state);
  }

  handleSubmit = (e) => {
    if(e.key === "Enter"){
      this.props.handleSearchSubmit(this.state);
    }
  }

  render(){
    return(
      <div className="rental-search-container">
        <div className="rental-icon-container">
          <img alt="searchIcon" src={searchIcon}/>
        </div>

        <div className="rental-input-container">
          <input
            className="query-input"
            type="text"
            name="query"
            placeholder="Search.."
            value={this.state.query}
            onChange={this.handleQueryChange}
            onKeyDown={this.handleSubmit}
          />
        </div>
        <div className="rental-input-container">
          <div>
            Bedrooms:
          </div>
          <select
            className="number-selector"
            name="bedrooms"
            value={this.state.bedrooms}
            onChange={this.handleSelectChange}
          >
            <option value="Any" className="selector-options">Any</option>
            <option value="1" className="selector-options">1</option>
            <option value="2" className="selector-options">2</option>
            <option value="3" className="selector-options">3</option>
            <option value="4" className="selector-options">4+</option>
          </select>
        </div>
        <div className="rental-input-container">
          <div className="rental-input-container">
            Bathrooms:
          </div>
          <select
            className="number-selector"
            name="bathrooms"
            value={this.state.bathrooms}
            onChange={this.handleSelectChange}
          >
            <option value="Any" className="selector-options">Any</option>
            <option value="1" className="selector-options">1</option>
            <option value="2" className="selector-options">2</option>
            <option value="3" className="selector-options">3</option>
            <option value="4" className="selector-options">4+</option>
          </select>
        </div>
        <div className="rental-input-container">
          <div>Min Price: ${this.state.minPrice}</div>
          <input
            className="range-slider"
            type="range"
            value={this.state.minPrice}
            id="minPrice"
            name="minPrice"
            min="0"
            max={this.maxPrice}
            step="25"
            onChange={this.handleSliderChange}
            onMouseUp={this.handleSliderRelease}
          />

        </div>
        <div className="rental-input-container">
           <div>Max Price: ${this.state.maxPrice}</div>
          <input
            className="range-slider"
            type="range"
            value={this.state.maxPrice}
            id="maxPrice"
            name="maxPrice"
            min="0"
            max={this.maxPrice}
            step="25"
            onChange={this.handleSliderChange}
            onMouseUp={this.handleSliderRelease}
          />
        </div>
      </div>
    )
  }
}

export default RentalSearchForm;