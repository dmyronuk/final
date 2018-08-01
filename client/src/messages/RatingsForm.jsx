import React, { Component } from 'react';

class RatingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
    }
  }
  render (){
    return (
      <div>
        <form onSubmit={this.props.addNewRating}>
          <label>
            Rate this user:
              <input
              min={1}
              max={5}
              name="rating"
              type="number"
              value={this.props.rating}
              onChange={this.props.handleInputChange} />
          </label>
          <button onSubmit={this.props.addNewRating}>Submit Rating</button>
        </form>
      </div>
    )
  }
}

export default RatingsForm;