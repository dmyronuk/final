import React, { Component } from 'react';
import ReactStars from 'react-stars'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';




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
          <Button onClick={this.props.addNewRating} variant="contained" color="primary">
           Rate
         </Button>
        </form>
      </div>
    )
  }
}

export default RatingsForm;