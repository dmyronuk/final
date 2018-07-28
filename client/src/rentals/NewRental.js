import React, { Component } from "react";
import axios from 'axios';

class NewRental extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURLs: [],
      data: {
        street: "",
        building: "",
        unit: "",
        city: "",
        pCode: "",
        province: "",
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        date: "",
        lng: "",
        lat: "",
      }
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  // Uploads images to public/uploads/listings
  handleUploadImage(ev) {
    ev.preventDefault();

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

  onChange = (e) => {
    const currData = Object.assign({}, this.state.data)
    currData[e.target.name] = e.target.value
    this.setState({ data: currData });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { data, imageURLs } = this.state;
    // console.log(data)
    let formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('images', JSON.stringify(imageURLs))
    axios.post('/api/listings', formData)
      .then(res => {
        // access results...
      });
  }

  render() {
    const { street, building, unit, city, pCode, province, price, bedrooms, bathrooms, date, lng, lat } = this.state.data;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Street</label>
          <div>
            <input type="text" name="street" value={street} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Building</label>
          <div>
            <input type="text" name="building" value={building} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Unit</label>
          <div>
            <input type="text" name="unit" value={unit} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Sity</label>
          <div>
            <input type="text" name="city" value={city} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Postal code</label>
          <div>
            <input type="text" name="pCode" value={pCode} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Province</label>
          <div>
            <input type="text" name="province" value={province} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Price</label>
          <div>
            <input type="text" name="price" value={price} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Bedrooms</label>
          <div>
            <input type="number" name="bedrooms" value={bedrooms} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Bashrooms</label>
          <div>
            <input type="number" name="bathrooms" value={bathrooms} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Date Av.</label>
          <div>
            <input type="date" name="date" value={date} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Lat</label>
          <div>
            <input type="number" name="lat" value={lat} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <label>Lng</label>
          <div>
            <input type="number" name="lng" value={lng} onChange={this.onChange} />
          </div>
        </div>
        <div>
          <input
            ref={(ref) => { this.uploadInput = ref; }}
            type="file" onChange={this.handleUploadImage}
            accept=".jpg, .jpeg, .png"
            />
        </div>
        <br />
        <button type="submit">Submit</button>
        <br />
        {this.createImgTag(this.state.imageURLs)}
      </form>

    );
  }
}

export default NewRental;