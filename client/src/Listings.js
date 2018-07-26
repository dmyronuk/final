import React, { Component } from "react";
import SimpleMap from "./Map";

class Listings extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  // getAllStudentInfo = async () => {
  //     const response = await fetch("/students");
  //     const data = await response.json();
  //     if (response.status !== 200){
  //       throw Error(data.message)
  //     }
  //     return data
  //   }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        Listings
        <SimpleMap listings={this.state.listings} />
      </div>
    )
  }
}

export default Listings