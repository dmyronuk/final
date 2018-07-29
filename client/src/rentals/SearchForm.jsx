import React, { Component } from "react";

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: "",
    }
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  handleSubmit = (e) => {
    if(e.key === "Enter"){
      this.props.handleSearchSubmit(this.state.query);
      this.setState({
        query: ""
      })
    }
  }

  render(){
    return(
      <input
        type="text"
        value={this.state.query}
        onChange={this.handleInputChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}

export default RentalSearchForm;