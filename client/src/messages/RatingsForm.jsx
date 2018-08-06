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
        <form>
          <label>
            Rate this user:
          </label>
            <ReactStars
              half = {false}
              value={this.props.rating}
              onChange={this.props.handleRatingChange}
            />
          <button id="rating-button" onClick={this.props.addNewRating} variant="contained" color="primary">
            Rate
          </button>
        </form>
      </div>
    )
  }
}

export default RatingsForm;