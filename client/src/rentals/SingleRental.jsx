import React, { Component } from "react";
import { getSingleListing } from "../ajax/listings";
import YelpSearch from "../yelp/YelpSearch";
import YelpResults from "../yelp/YelpResults";
import dateFromTimestamp from "../helpers/time-formatters";


class SingleRental extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      yelpResultsClass: "hidden",
    }
  }

  setYelpData = (data) => {
    console.log(data)
    this.setState({
      yelpResults: data,
      yelpResultsClass: "visible",
    })
  }


  componentDidMount(){
    getSingleListing(this.state.id)
    .then(data => {
      const formattedDate = dateFromTimestamp(data.date_available);
      console.log(data)
      this.setState({
        data,
        formattedDate,
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
                <img alt="rental" src={this.state.data.photos[0]} />
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
                <YelpResults results={this.state.yelpResults} />
              }
            </div>
          </div>
        }
        {true &&
          <div></div>
        }
      </div>
    )
  }
}


export default SingleRental;
