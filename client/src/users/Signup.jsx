import React from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../ajax/auth";

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
      this.props.setUser(data.user)
      this.setState({
        redirect: true
      })
    }else{
      this.setState({errors: data.errors})
    }
  }

  render() {
    return (
      <div className="default-flex-column-container">
        { this.state.redirect && <Redirect to="/" /> }
        <div className="register-container">
          { this.state.errors && this.state.errors.map((err) => <div>{err}</div> )}
          <section className="login" id="login">
            <header>
              <h2>Rental App</h2>
              <h4>Register</h4>
            </header>
            <form className="login-form" onSubmit={this.handleSubmit }>
              <div>
                <input
                  className="login-input"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  className="login-input"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  className="login-input"
                  type="tel"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="Phone #"
                />
              </div>
              <div>
                <input
                  className="login-input"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email@"
                />
              </div>
              <div>
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password" />
              </div>
              <div>
                <input
                  className="login-input"
                  type="password"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  placeholder="Password Confirmation"
                />
              </div>
              <select name="user_type" onChange={this.handleChange}>
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
              </select>
              <div className="submit-container">
                <input type="submit" value="submit" className="login-button"/>
              </div>
            </form>
            </section>
        </div>
      </div>
    )
  }
}

export default Signup