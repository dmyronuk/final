import React, { Component } from "react";
import { login } from "../ajax/auth";
import { Redirect } from "react-router-dom";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      password: "",
      errorMessages:[]
    }
  }

  handleChange = (e) => {
    const newStateObj = {};
    newStateObj[e.target.name] = e.target.value;
    const newState = Object.assign(this.state, newStateObj);
    this.setState(newState);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(this.state);

    //if the login route returns a token, set the token in user's local storage and redirect to root
    if(data.token){
      localStorage.setItem("JWT_TOKEN", data.token);
      this.props.setUser(data.user)
      this.setState({
        redirect: true,
      })
    //if login fails, token will be null and server will return error messages - display errors
    }else{
      this.setState({
        errorMessages: data.errorMessages,
      })
    }
  }

  render() {
    return (
      <div>
        { this.state.redirect && <Redirect to="/" /> }
        <form onSubmit={this.handleSubmit }>
          <div>
            <div>
              Errors:
              {this.state.errorMessages.map(err => <div>{ err }</div>)}
            </div>

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
      </div>
    )
  }
}

export default Login