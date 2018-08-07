import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSingleListing } from "../ajax/listings";
import { getUserFromLandlordId } from "../ajax/profile";
import YelpSearch from "../yelp/YelpSearch";
import YelpResults from "../yelp/YelpResults";
import dateFromTimestamp from "../helpers/time-formatters";
import { refetchUser } from "../ajax/auth";
import MessageIcon from "../icons/message_icon3.png";
import ImageGallery from "react-image-gallery";
import numberWithCommas from "../helpers/number-formatters";

import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

class SingleRental extends Component {

  constructor(props) {
    super(props)
    this.state = {
      yelpResultsHeight: 0,
      id: Number(this.props.match.params.id),
      yelpResultsClass: "hidden",
    }
  }

  setYelpData = (data, term) => {
    this.setState({
      yelpSearchTerm: term,
      yelpResults: data,
      yelpResultsClass: "visible",
    })
  }

  createArrayForImageGalleryFormat = (obj) => {
    let photosArr = obj.photos
    let outputArr = photosArr.map(photoURL => {
      let obj = {}
      obj.original = photoURL
      obj.thumbnail = photoURL
      obj.originalClass = "mappedImages"
      return obj
    })

    return outputArr
  }

  componentDidMount() {
    // getUserFromLandlordId(this.props.id)
    getSingleListing(this.state.id)
    .then(data => {
      const formattedDate = dateFromTimestamp(data.date_available);
      this.setState({
        data,
        formattedDate,
        images: this.createArrayForImageGalleryFormat(data),
      })
      // gets the user id corresponding the landlord who created the listing
      getUserFromLandlordId(this.state.data.landlords_id)
      .then(landlordUserId => {
        this.setState({
          landlordUserId: landlordUserId.users_id,
        })

        // gets the user ID
        if (localStorage.JWT_TOKEN) {
          refetchUser({ token: localStorage.JWT_TOKEN })
          .then(user => {
            this.setState({
              current_user: user.id,
            })
          })
        }
      })

      const rentalCardHeight = this.rentalCard.clientHeight;
      this.setState({ yelpResultsHeight: rentalCardHeight });

    })
  }

  componentDidUpdate(){
    //dynamically resize yelp results to match the height of the rental card

  }

  render() {
    return (
      <div className="default-flex-row-container">
        {this.state.data &&
          <div className="card-container">
            <div className="single-rental-card" ref={ (rentalCard) => this.rentalCard = rentalCard}>

                {this.state.data.photos ?
                  // <img alt="Rental Photo" src={this.state.data.photos[0]} />
                  <ImageGallery
                    items={this.state.images}
                    showBullets={false}
                    showPlayButton={false}
                    showThumbnails={false}
                  />
                  : <img alt="Resource Not Available" src="/images/no-image.png" />
                }
              <div className="rental-card-info">
                <div className="mask"></div>
                <div className="single-card-address-container">
                  {this.state.data.street}, {this.state.data.city} | {this.state.data.postal_code}
                </div>
                <div className="summary">
                  <div className="table-container">
                    <table>
                      <tbody>
                        <tr>
                          <td>${numberWithCommas(this.state.data.price)} / Month</td>
                        </tr>
                        <tr>
                          <td>{this.state.data.bedrooms} Bedrooms</td>
                        </tr>
                        <tr>
                          <td>{this.state.data.bathrooms} Bathrooms</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h4>Nearby Amenities</h4>
                    <YelpSearch
                      latitude={this.state.data.lat}
                      longitude={this.state.data.lng}
                      radius={"5000"}
                      setYelpData={this.setYelpData}
                    />
                  </div>
                </div>
                <div className="description">
                  <div>{this.state.data.description}</div>

                  {/* the div below is the link to contact the landlord, the landlord cannot contact himself */}
                  <div className="landlord-contact-container">

                    {(this.state.landlordUserId && this.state.landlordUserId !== this.state.current_user) &&
                      <Link to={"/messages/" + this.state.landlordUserId}>
                        <img alt="Messages" src={MessageIcon} />  <br />
                        Contact
                        </Link>}
                  </div>
                </div>
              </div>
            </div>
            <div className={this.state.yelpResultsClass + " yelp-results-container"}>
              {this.state.yelpResults &&
                <YelpResults
                  results={this.state.yelpResults}
                  searchTerm={this.state.yelpSearchTerm}
                  height={this.state.yelpResultsHeight}
                />
              }
            </div>

          </div>
        }
      </div>
    )
  }
}

export default SingleRental;
