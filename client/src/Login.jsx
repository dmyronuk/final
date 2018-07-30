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
      <form>
        <input type="text" name="email" placeholder="name" />
        <input type="text" name="password" placeholder="password"/>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}


export default Login