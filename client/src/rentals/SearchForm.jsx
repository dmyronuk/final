import React, { Component } from "react";

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: "",
      bedrooms: "Any",
    }
  }

  handleQueryChange = (e) => {
    const newState = Object.assign(this.state, {query: e.target.value})
    this.setState(newState);
  }

  handleSelectChange = (e) => {
    const beds = Number(e.target.value)
    const newState = Object.assign(this.state, {bedrooms: beds})
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
          value={this.state.value}
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