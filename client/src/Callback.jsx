import { Component } from "react";
import { setIdToken, setAccessToken } from "./utils/AuthService";
class Callback extends Component {
  constructor() {
    super();

    this.state = {
      from: "/"
    };
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = this.state.from;
  }

  render() {
    return null;
  }
}

export default Callback;
