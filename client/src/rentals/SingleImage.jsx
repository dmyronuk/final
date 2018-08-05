import React, { Component } from "react";

class SingleImage extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image
  }

  render() {
    console.log('SingleImage has rendered/re-rendered')
    return (
      <div>
        {this.props.index === 0 && <h3>Main Picture</h3>}
        <img src={this.props.image} alt="img" />
        <button type="submit" onClick={() => this.props.handleDeleteImage(this.props.image)}>Remove</button>
      </div>
    )
  }
}

export default SingleImage

