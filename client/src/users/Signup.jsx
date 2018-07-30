import React from "react";
import { signup } from "../ajax/auth";

class Signup extends React.Component {

  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      user_type: "tenant",
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
    console.log(this.state)
    signup(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit }>
        <div>
        First Name
          <input
            type="text"
            name="first_name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Last Name
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Phone
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </div>
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
            onChange={this.handleChange}/></div>
        <div>
          Password Confirmation
          <input
            type="text"
            name="password_confirmation"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
        </div>
        <select name="user_type" onChange={this.handleChange}>
          <option value="landlord">Landlord</option>
          <option value="tenant">Tenant</option>
        </select>
        <div><input type="submit" value="submit"/></div>
      </form>
    )
  }
}

export default Signup