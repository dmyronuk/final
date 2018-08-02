import React, { Component } from 'react';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  constructor(props) {
   super(props);
  }

  render() {
    return (
      <AppContext.Provider value = {this.props.user}>
      </AppContext.Provider>
    )
  }
}

