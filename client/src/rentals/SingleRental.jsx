import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSingleListing } from "../ajax/listings";
import { getUserFromLandlordId } from "../ajax/profile";
import YelpSearch from "../yelp/YelpSearch";
import YelpResults from "../yelp/YelpResults";
import dateFromTimestamp from "../helpers/time-formatters";
import { refetchUser } from "../ajax/auth";

class SingleRental extends Component {

  constructor(props){
    super(props)
    this.state = {
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


  componentDidMount(){
    // getUserFromLandlordId(this.props.id)
    getSingleListing(this.state.id)
    .then(data => {
      const formattedDate = dateFromTimestamp(data.date_available);
      console.log(data, "hi")
      this.setState({
        data,
        formattedDate,
      })
      // gets the user id corresponding the landlord who created the listing
      getUserFromLandlordId(this.state.data.landlords_id)
      .then(landlordUserId => {
        this.setState({
          landlordUserId: landlordUserId.users_id,
        })

        // gets the user ID
        if(localStorage.JWT_TOKEN){
          refetchUser({token: localStorage.JWT_TOKEN})
          .then(user => {
            this.setState({
              current_user: user.id,
            })
          })
        }
      })

    })
  }

  render(){

    return (
      <div className="default-flex-row-container">
        {this.state.data &&
          <div className="card-container">
            <div className="single-rental-card">
              <div className="image-container">
                { this.state.data.photos ?
                  <img alt="Rental Photo" src={this.state.data.photos[0]} />
                  : <img alt="No Photo Available" src="/images/no-image.png" />
                }
                <div className="mask"></div>
                <div >
                  {this.state.data.street}, {this.state.data.city} | {this.state.data.postal_code}
                </div>
              </div>
              <div className="rental-card-info">
                <div className="summary">
                  <div className="table-container">
                    <table>
                      <tbody>
                        <tr>
                          <td>${this.state.data.price}/mo</td>
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
                  </div>
                  <YelpSearch
                    latitude = {this.state.data.lat}
                    longitude = {this.state.data.lng}
                    radius = {"5000"}
                    setYelpData = {this.setYelpData}
                  />
                </div>
                <div className="description">
                  <div>{this.state.data.description}</div>
                </div>
              </div>
            </div>
            <div className={this.state.yelpResultsClass + " yelp-results-container"}>
              {this.state.yelpResults &&
                <YelpResults results={this.state.yelpResults} searchTerm={this.state.yelpSearchTerm} />
              }
            </div>
          {/* the div below is the link to contact the landlord, the landlord himself cannot contact himself */}
            <div>

              {(this.state.landlordUserId && this.state.current_user && this.state.landlordUserId !== this.state.current_user) &&
                  <Link to={"/chat/" + this.state.landlordUserId}>
                    Contact Landlord!
                  </Link>}
            </div>

            {/* if user is not logged in, it will show a please login to contact landlord, there is a slight blink*/}
            <div>
              {(this.state.landlordUserId && !this.state.current_user) && <p>Please login to contact landlord</p> }
            </div>
          </div>
        }
      </div>
    )
  }
}


export default SingleRental;
