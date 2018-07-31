import React from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../ajax/auth";
import { fieldIsValidLength, fieldIsValidPhone } from "../helpers/validations";

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errorMessages: null,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      user_type: "landlord",
    }
  }

  handleChange = (e) => {
    const newStateObj = {};
    newStateObj[e.target.name] = e.target.value;
    this.setState(newStateObj);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(this.state);
    if(data.status === "success"){
      //console.log("token:", data.token)
      localStorage.setItem("JWT_TOKEN", data.token);
      console.log("Data after submit", data)
      this.props.setUser(data.user)
      this.setState({
        redirect: true
      })
    }else{
      const msg = "Signup Validation Failed"
      this.setState({errorMessages: msg})
    }
  }

  render() {
    return (
      <div>
        { this.state.redirect && <Redirect to="/" /> }
        { this.state.errorMessages }
        <form onSubmit={this.handleSubmit }>
          <div>
          First Name
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            Last Name
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
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
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </div>
          <select name="user_type" onChange={this.handleChange}>
            <option value="landlord">Landlord</option>
            <option value="tenant">Tenant</option>
          </select>
          <div>
            <input type="submit" value="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup