import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class Unauthorized extends Component {

  componentDidMount() {
    document.title = "Unauthorized Request"
  }

  render() {
    return (
      <div className="default-flex-column-container">
        <h2>Not Authorized.</h2>
        <Link to="/">
          <Button
            variant="extendedFab"
            size="large"
            style={{
              padding: "14px 36px",
              fontSize: "18px"
            }}
          >
            Return home
          </Button>
        </Link>
      </div>
    )
  }
}

export default Unauthorized
