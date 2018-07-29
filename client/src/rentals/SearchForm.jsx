import React, { Component } from "react";

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: "",
      bedrooms: "Any",
      bathrooms: "Any",
    }
  }

  handleQueryChange = (e) => {
    const newState = Object.assign(this.state, {query: e.target.value})
    this.setState(newState);
  }

  //handles change for any dropdown selector like bedrooms, bathrooms etc
  //immediately changes state so a new query is fired off
  handleSelectChange = (e) => {
    const stateUpdateObj = {}
    stateUpdateObj[e.target.name] = e.target.value
    const newState = Object.assign(this.state, stateUpdateObj)
    this.setState(newState);
    this.props.handleSearchSubmit(this.state);
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
      </div>
    )
  }
}

export default RentalSearchForm;