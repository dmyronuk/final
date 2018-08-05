import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class MyRentals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      listings: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("JWT_TOKEN")
    axios.get('/api/landlord-listings', { headers: { Authorization: token } } )
    .then(listings => {
      let landlordListings = listings.data;
      this.setState({...this.state, listings: landlordListings})
    })
    .catch(err => {
      this.setState({redirect: true})
    })
  }


  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to="/" />}
         <table>
          <tr>
            <th colSpan="3">My Listings</th>
          </tr>
          {this.state.listings.map((listing, i) =>
              <tr>
                <td>
                 {listing.street + listing.city}
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
        </table>
      </div>
    )
  }
}

export default MyRentals;