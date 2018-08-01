import React, { Component } from "react";
import axios from 'axios';
import { getSingleListing } from "../ajax/listings";
import { Redirect } from "react-router-dom";

class RentalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        street: '',
        city: '',
        province: '',
        postal_code: '',
        lat: 0,
        lng: 0,
        unit: '',
        price: "",
        bedrooms: "",
        bathrooms: "",
        date: "",
        description: "",
      },
      imageURLs: [],
      redirect: false,
    }
    this.autocomplete = null
  }

  async componentDidMount() {
    let options = {
      componentRestrictions: { country: "CA" }
    }
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), options)
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

  handleUploadImage = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    axios.post('/api/upload', data)
      .then(res => {
        let prevUrls = this.state.imageURLs;
        this.setState({
          imageURLs: [...prevUrls, res.data.file],
        })
      })
  }

  createImgTag(arr) {
    return arr.map(elm => <img key={elm} src={elm} alt="img" />)
  }

  handleChange = (e) => {
    const currData = Object.assign({}, this.state.data)
    currData[e.target.name] = e.target.value
    this.setState({ data: currData });
  }

  handlePlaceSelect = async () => {
    // Google Place Autocomplete call
    let addressObject = await this.autocomplete.getPlace()
    let address = addressObject.address_components
    let geocoder = new window.google.maps.Geocoder();
    // Google Geocode call
    geocoder.geocode( { 'address': `${addressObject.name} ${address[3].long_name} ${address[6].long_name}`}, (results, status) => {
      let currData = Object.assign({}, this.state.data, {
        street: addressObject.name || "",
        city: address[3].long_name || "",
        province: address[5].long_name || "",
        postal_code: results[0].address_components[7].long_name || "",
        lat: addressObject.geometry.location.lat() ,
        lng: addressObject.geometry.location.lng() ,
      })
      this.setState({ data: currData })
    })

  }

  render() {
    const { street, city, province, postal_code, lat, lng, unit, price, bedrooms, bathrooms, date, description } = this.state.data;
    return(
      <div>
        { this.state.redirect && <Redirect to="/profile" /> }
        <h1>Create New Listing</h1>
        <form onSubmit={this.handleSubmit}>
          <label> Autocomplete: </label>
          <input id="autocomplete"
            className="input-field"
            ref="input"
            type="text"
            required/><br/>
          <input
            name={"street"}
            value={street}
            placeholder={"Street Address"}
            onChange={this.handleChange}/>
          <input
            name={"city"}
            value={city}
            placeholder={"City"}
            onChange={this.handleChange}/>
          <input
            name={"province"}
            value={province}
            placeholder={"Province"}
            onChange={this.handleChange}/>
          <input
            name={"postal_code"}
            value={postal_code}
            placeholder={"Postal Code"}
            onChange={this.handleChange}/><br/>
          <label>Unit#</label>
          <input
            type="number"
            name="unit"
            value={unit}
            onChange={this.handleChange}
            min="0"/><br/>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
            min="1"
            required/><br/>
          <label>Bedrooms</label>
          <input
           type="number"
           name="bedrooms"
           value={bedrooms}
           onChange={this.handleChange}
           min="0"
           max="10"
           required/><br/>
          <label>Bashrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={bathrooms}
            onChange={this.handleChange}
            min="0"
            max="5"
            required/><br/>
          <label>Date Av</label>
          <input
            type="date"
            name="date" value={date}
            onChange={this.handleChange}
            required/><br/>
          <label>Description</label><br/>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange} /><br/>
          <input
            ref={(ref) => { this.uploadInput = ref; }}
            type="file" onChange={this.handleUploadImage}
            accept=".jpg, .jpeg, .png" /><br/>
          <button onSubmit={this.handleSubmit}>Submit</button>
        </form>
        <button onClick={this.handleDelete}> Delete</button>
        {this.createImgTag(this.state.imageURLs)}
      </div>
    )
  }

}

export default RentalForm



