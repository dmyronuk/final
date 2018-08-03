import React, { Component } from "react";
import getAllOwnRentals from "../users/ajax";


class MyRentals extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getAllOwnRentals()
    .then((rentals) => {
      this.setState({
        rentals
      })
      console.log(rentals);
    })
  }


  render () {
    return (
      <div>

      </div>
      )
  }
}


export default MyRentals;


