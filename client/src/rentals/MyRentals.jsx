import React, {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import TrashIcon from "../icons/trash.png";
import BackgroundImage from "../BackgroundImage";

class MyRentals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      listings: [],
    }
  }

  deleteListing = (listingId) => {
    const token = localStorage.getItem("JWT_TOKEN");
    axios.delete(`/api/listings/${listingId}`, {
      data: { token: token }
    }).then(res => {
      const updatedListings = this.state.listings.filter(elem => elem.id !== listingId);
      this.setState({listings: updatedListings});
    })
  }

  componentDidMount() {
    document.title = "My Listings | Kiro"
    const token = localStorage.getItem("JWT_TOKEN")
    axios.get("/api/landlord-listings", { headers: { Authorization: token } } )
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
            <tbody>
              <tr>
                <th colSpan="4">My Listings</th>
              </tr>
              {this.state.listings.map((listing, i) =>
                  <tr key={i}>
                    <td>
                      {listing.street}, {listing.city}
                    </td>
                    <td>
                      <Link to={`/rentals/${listing.id}`}>Show</Link>
                    </td>
                    <td>
                      <Link to={`/rentals/${listing.id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => this.deleteListing(listing.id)}>
                        <img alt="TrashIcon" src={ TrashIcon }/>
                      </button>
                    </td>
                  </tr>
                )
              }
              {this.state.noListings &&
                <tr>
                  <td colSpan={4}> Nothing Here</td>
                </tr>
              }
              <tr>
                <td className="add-listing-td" colSpan={4}>
                  <Link to={"/rentals/new"} >
                    Add
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default MyRentals;