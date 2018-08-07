import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import BackgroundImage from "../BackgroundImage";

class MyRentals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      listings: [],
    }
  }

  componentDidMount() {
    document.title = `My Listings | Kiro `
    const token = localStorage.getItem("JWT_TOKEN")
    axios.get('/api/landlord-listings', { headers: { Authorization: token } } )
    .then(listings => {
      const noListings = listings.data.length === 0;
      let landlordListings = listings.data;
      this.setState({...this.state, listings: landlordListings, noListings})
    })
    .catch(err => {
      this.setState({redirect: true})
    })
  }

  render() {
    return (
      <div className="rentals-manage-container">
        <BackgroundImage />
        <div className="rentals-manage-container">
          {this.state.redirect && <Redirect to="/error/401" />}
           <table>
            <tr>
              <th colSpan="3">My Listings</th>
            </tr>
            {this.state.listings.map((listing, i) =>
                <tr>
                  <td>
                   {listing.street}, {listing.city}
                  </td>
                  <td>
                    <Link to={`/rentals/${listing.id}`}>Show</Link>
                  </td>
                  <td>
                    <Link to={`/rentals/${listing.id}/edit`}>Edit</Link>
                  </td>
                </tr>
              )
            }
            {this.state.noListings &&
              <tr>
                <td colSpan={3}> Nothing Here</td>
              </tr>
            }
            <tr>
              <td className="add-listing-td" colSpan={3}>
                <Link to={"/rentals/new"} >
                  Add
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default MyRentals;