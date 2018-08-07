import React, { Component } from 'react';
import ReactStars from 'react-stars'

class RatingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      ratingSubmitted: this.props.ratingSubmitted,
    }
  }
  render (){
    return (

      <div>
        <form onSubmit={this.props.addNewRating}>
          <label>
            Rate this user:
          </label>
            <ReactStars
              half = {false}
              size ={22}
              value={this.props.rating}
              onChange={this.props.handleRatingChange}
            />
          <button id="rating-button" onSubmit={this.props.addNewRating} variant="contained" color="primary">
            Rate
          </button>
        </form>
      </div>
    )
  }
}

export default RatingsForm;