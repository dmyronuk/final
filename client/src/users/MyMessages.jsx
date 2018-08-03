import React, { Component } from "react";
import { getUserProfile } from "../ajax/profile";
import { getAllRatingsOfUser } from "../ajax/ratings";
import { getAllThreads } from "../ajax/threads";
import SingleThread  from "./SingleThread.jsx";
import { refetchUser } from "../ajax/auth";
import { Redirect } from "react-router-dom";

// context
// import AppContext from "../provider.jsx";


class MyMessages extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }



  componentDidMount(){
    // const tokenObj = {token: localStorage.getItem("JWT_TOKEN")};
    // const profileData = getUserProfile(tokenObj);
    if(localStorage.JWT_TOKEN){
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        getAllThreads(user.id)
        .then(threads => {
          this.setState({
            threads
          })
        })
      })
    }
  }

  // renderOne(data) {
  //   return (

  //     )
  // }

  render(){
    return(
      <div>
        {!localStorage.JWT_TOKEN && <Redirect to="/login"/> }
        {this.state.threads &&
         <table>
          <tr>
            <th>messages</th>
            <th>recipient</th>
            <th>link</th>
          </tr>
          {this.state.threads.map((data, i) => {
            return <SingleThread key={i} theKey={i} thread={data}/>
          })}
         </table>
        }
      </div>

    )
  }
}

export default MyMessages
