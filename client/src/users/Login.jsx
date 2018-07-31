import React from "react";
import { login } from "../ajax/auth";

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    }
  }

  handleChange = (e) => {
    const newStateObj = {};
    newStateObj[e.target.name] = e.target.value;
    const newState = Object.assign(this.state, newStateObj);
    this.setState(newState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit }>
        <div>
          Email
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input type="submit" value="submit"/>
        </div>
      </form>
    )
  }
}

export default Login