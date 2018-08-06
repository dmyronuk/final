import React, { Component } from "react";
import { login } from "../ajax/auth";
import { Redirect } from "react-router-dom";
import BackgroundImage from "../BackgroundImage";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextUrl: "/",
      redirect: false,
      email: "",
      password: "",
      errors: null,
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
    if (data.token) {
      localStorage.setItem("JWT_TOKEN", data.token);
      this.props.setUser(data.user)
      this.setState({
        redirect: true,
      })
      //if login fails, token will be null and server will return error messages - display errors
    } else {
      this.setState({
        errors: data.errors,
      })
    }
  }

  addError = (err) => {
    let errType;
    switch (err) {
      case "Login failed":
        errType = 'error_2'
        break;
      case "All fields required":
        errType = "error_1"
        break;
    }
    let form = document.getElementById('form')
    form.classList.add(errType)
    setTimeout(function () {
      form.classList.remove(errType);
    }, 3000)
    this.setState({ errors: null });
  }

  render() {
    return (

      <div className="default-flex-column-container">
        <BackgroundImage />
        {this.state.redirect && <Redirect to={this.state.nextUrl} />}
        {this.state.errors && this.addError(this.state.errors[0])}
        <div className="login-container" >
          <section className="login" id="form">
            <header>
              <h2>Login</h2>
            </header>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="login-input"
                placeholder="Email" />
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="login-input"
                placeholder="Password" />
              <div className="submit-container">
                <input type="submit" value="Login" className="login-button" />
              </div>
            </form>
          </section>
        </div>
      </div>
    )
  }
}

export default Login