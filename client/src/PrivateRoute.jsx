import React, { Component } from "react";
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from './utils/AuthService';



const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn())
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} />
  )
}

export default PrivateRoute