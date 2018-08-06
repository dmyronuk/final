import React, { Component } from "react";
import axios from 'axios';
import { getSingleListing } from "../ajax/listings";
import { Redirect } from "react-router-dom";
import BackgroundImage from "../BackgroundImage";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {fetchLandlord} from "../ajax/auth.js";

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
      edit: false,
    }
    this.autocomplete = null
  }

  componentDidMount() {
    if(localStorage.JWT_TOKEN){
      fetchLandlord({token: localStorage.JWT_TOKEN})
      .then(res => {
        this.setState({landlordId : res.id})
      })
    }
  }
  componentDidUpdate() {
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
    return arr.map((elm, i) => <img key={i} src={elm} alt="img" />)
  }

  handleChange = (e) => {
    const currData = Object.assign({}, this.state.data)
    currData[e.target.name] = e.target.value
    this.setState({ data: currData });
    console.log(this.state.landlordId);
  }

  handlePlaceSelect = async () => {
    // Google Place Autocomplete call
    let addressObject = await this.autocomplete.getPlace()
    if (!addressObject.address_components) return
    let address = addressObject.address_components
    let geocoder = new window.google.maps.Geocoder();
    // Google Geocode call
    // geocoder.geocode( { 'address': `${addressObject.name} ${address[3].long_name} ${address[6].long_name}`}, (results, status) => {
    let currData = Object.assign({}, this.state.data, {
      street: addressObject.name,
      city: address[3].long_name,
      province: address[5].long_name,
      postal_code: address[address.length > 7 ? 7 : 6].long_name,
      lat: addressObject.geometry.location.lat(),
      lng: addressObject.geometry.location.lng(),
    })
    this.setState({ data: currData })
    // })

  }
  // {!this.state.landlordId && <Redirect to="/" />}

  render() {
    const { street, city, province, postal_code, lat, lng, unit, price, bedrooms, bathrooms, date, description } = this.state.data;
    if (!localStorage.JWT_TOKEN) {
      return <Redirect to="/login"/>
    } else if (this.state.landlordId === undefined) {
      return <div> Loading... </div>
    } else if (!this.state.landlordId) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <BackgroundImage />
        <div className="new-rental-container">
          {this.state.redirect && <Redirect to="/my-messages" />}
          <form className="new-listing-container" onSubmit={this.handleSubmit}>
            <h2>Add Listing</h2>
            <h3> Address </h3>
            <div className="address-container">
              <div className="textfield">
                <TextField
                  id="autocomplete"
                  label="Type Address Here"
                  ref="input"
                  required
                  fullWidth
                />
              </div>

              <div className="textfield">
                <TextField
                  required
                  fullWidth
                  label="Street Address"
                  name={"street"}
                  value={street}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>


              <div className="textfield">
                <TextField
                  required
                  fullWidth
                  name={"city"}
                  label="City"
                  value={city}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

              <div className="textfield">
                <TextField
                  required
                  fullWidth
                  name={"province"}
                  label="Province"
                  value={province}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

              <div className="textfield">
                <TextField
                  required
                  fullWidth
                  name={"postal_code"}
                  label="Postal Code"
                  value={postal_code}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={this.handleChange} />
              </div>

              <div className="textfield">
                <TextField
                  type="number"
                  label="Unit Number"
                  name="unit"
                  fullWidth
                  value={unit}
                  min={0}
                  onChange={this.handleChange} />
              </div>

            </div>

              <h3> Listing Details </h3>
            <div className="listing-description-container">

              <div className="textfield">
                <TextField
                  inputStyle={{ fontSize: '2rem' }}
                  type="number"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  min="1"
                  max="10000"
                  required
                />
              </div>

              <div className="textfield">
                <TextField
                  inputStyle={{ fontSize: '2rem' }}
                  label="Bedrooms"
                  type="number"
                  name="bedrooms"
                  value={bedrooms}
                  onChange={this.handleChange}
                  min="0"
                  max="10"
                  required
                />
              </div>

              <div className="textfield">
                <TextField
                  inputStyle={{ fontSize: '2rem' }}
                  label="Bathrooms"
                  type="number"
                  name="bathrooms"
                  value={bathrooms}
                  onChange={this.handleChange}
                  min="0"
                  max="5"
                  required
                />
              </div>

              <div className="textfield">
                <TextField
                  inputStyle={{ fontSize: '2rem' }}
                  label="Date Available"
                  type="date"
                  name="date"
                  value={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  require
                />
              </div>
              <div className="textfield">
                <TextField
                  inputStyle={{ fontSize: '2rem' }}
                  multiline
                  required
                  fullWidth
                  label="Description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange} />
              </div>
            </div>


              <h3> Images </h3>
            <div className="images-container">
              <input
                ref={(ref) => { this.uploadInput = ref; }}
                type="file" onChange={this.handleUploadImage}
                accept=".jpg, .jpeg, .png" />
            </div>
            <div className = "submit">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>Post Your Listing</Button>
            </div>
          </form>

          {this.state.edit && <button onClick={this.handleDelete}> Delete</button>}
          {this.createImgTag(this.state.imageURLs)}
        </div>
      </div>
    )
  }

}

export default RentalForm




