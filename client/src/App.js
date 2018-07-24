import React, { Component } from "react";
import Main from "./Main";
import Header from "./Header";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
