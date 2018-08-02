import React, { Component } from "react";
import RentalForm from "./RentalForm";
import { getSingleListing } from "../ajax/listings";
import dateFromTimestamp from "../helpers/time-formatters";
import axios from 'axios';

class EditRentalForm extends RentalForm {


  async componentDidMount() {
    super.componentDidMount()
    this.setState({edit: true})
    let listingId = this.props.match.params.id
    let listing = listingId && await getSingleListing(listingId)
    if (listing) {
      this.setState({
        data: listing,
        imageURLs: listing.photos || [],
        edit: true,
        id: listing.id
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem("JWT_TOKEN");
    const { data, imageURLs } = this.state;
    axios.patch(`/api/listings/${this.props.match.params.id}`, {
      data: data,
      imageURLs: imageURLs,
      token: token,
    })
    .then(res => {

    })
  }

  handleDelete = (e) => {
    e.preventDefault();
    console.log(this.props.match.params.id)
    const token = localStorage.getItem("JWT_TOKEN");
    axios.delete(`/api/listings/${this.props.match.params.id}`, {
      data: { token: token,}
    }).then(res => {
      this.setState({redirect: true })
    })
    this.setState({redirect: true })
  }

}

export default EditRentalForm