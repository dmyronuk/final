import React, { Component } from "react";

class RentalSearchForm extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <form>
        <input type="text" />
        <input type="submit" value="Search"/>
      </form>
    )
  }
}

export default RentalSearchForm