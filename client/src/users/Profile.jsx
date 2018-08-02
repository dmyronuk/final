import React, { Component } from "react";
import { getUserProfile } from "../ajax/profile";
import { getAllRatingsOfUser } from "../ajax/ratings";
import { getAllThreads } from "../ajax/threads";
import SingleThread  from "./SingleThread.jsx";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }



  componentDidMount(){
    const tokenObj = {token: localStorage.getItem("JWT_TOKEN")};
    const profileData = getUserProfile(tokenObj);
    getAllThreads()
    .then(threads => {
      this.setState({
        threads
      })
      console.log(threads);
    })
  }

  // renderOne(data) {
  //   return (

  //     )
  // }

  render(){
    return(
      <div>
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

export default Profile
