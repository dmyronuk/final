import React, { Component } from "react";

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
    this.maxPrice = 500000
    this.state = {
      query: "",
      bedrooms: "Any",
      bathrooms: "Any",
      price: 500000
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

  handleSubmit = (e) => {
    if(e.key === "Enter"){
      this.props.handleSearchSubmit(this.state);
    }
  }

  render(){
    return(
      <div>
        <input
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.handleQueryChange}
          onKeyDown={this.handleSubmit}
        />
        <select
          name="bedrooms"
          value={this.state.bedrooms}
          onChange={this.handleSelectChange}
        >
          <option value="Any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select
          name="bathrooms"
          value={this.state.bathrooms}
          onChange={this.handleSelectChange}
        >
          <option value="Any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input
          type="range"
          value={this.state.price}
          id="price"
          name="price"
          min="0"
          max={this.maxPrice}
          step="25"
          onChange={this.handleSliderChange}
        />
      </div>
    )
  }
}

export default RentalSearchForm;