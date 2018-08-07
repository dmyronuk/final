import React from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../ajax/auth";
import BackgroundImage from "../BackgroundImage";
import { toTitleCase } from "../helpers/name-formatters";

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errors: null,
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
    if(! data.errors){
      localStorage.setItem("JWT_TOKEN", data.token);
      data.user.first_name = toTitleCase(data.user.first_name);
      data.user.last_name = toTitleCase(data.user.last_name);
      this.props.setUser(data.user)
      this.setState({
        redirect: true
      })
    }else{
      this.setState({errors: data.errors})
    }
  }
  addError = (err) => {
    console.log(err)
    let errType;
    switch(err) {
      case "All fields mandatory" :
        errType = 'error_1'
        break;
      case "Invalid phone number" :
        errType = "error_2"
        break;
      case "Password must be 8 characters" :
        errType = "error_3"
        break;
      case "Passwords do not match" :
        errType = "error_4"
        break;
    }
    let form = document.getElementById('form')
    form.classList.add(errType)
    setTimeout(function () {
     form.classList.remove(errType);
    }, 3000)
    this.setState({errors: null});
  }

  render() {
    return (
      <div className="default-flex-column-container">
        <BackgroundImage />
        { this.state.redirect && <Redirect to="/" /> }
        <div className="register-container">
          { this.state.errors && this.addError(this.state.errors[0])}
          <section className="register" id="form">
            <header>
              <h2>Register</h2>
            </header>
            <form className="register-form" onSubmit={this.handleSubmit}>
              <div>
                <input
                  className="register-input"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  className="register-input"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  className="register-input"
                  type="tel"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                />
              </div>
              <div>
                <input
                  className="register-input"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  className="register-input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password" />
              </div>
              <div>
                <input
                  className="register-input"
                  type="password"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  placeholder="Password Confirmation"
                />
              </div>
              <div className="select-style">
                <select name="user_type" onChange={this.handleChange}>
                  <option value="landlord">Landlord</option>
                  <option value="tenant">Tenant</option>
                </select>
              </div>
              <div className="submit-container">
                <input type="submit" value="Register" className="register-button"/>
              </div>
            </form>
            </section>
        </div>
      </div>
    )
  }
}

export default Signup