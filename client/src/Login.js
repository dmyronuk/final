import React from "react";
import { login } from './utils/AuthService';

class Login extends React.Component {

  constructor() {
    super();
  }

  login = () => {
    login()
  }

  render() {
    
    return (
      <div>
        <p>You must log in to view this page!</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}


export default Login