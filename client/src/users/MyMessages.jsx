import React, { Component } from "react";
import { getUserProfile } from "../ajax/profile";
import { getAllRatingsOfUser } from "../ajax/ratings";
import { getAllThreads } from "../ajax/threads";
import SingleThread  from "./SingleThread.jsx";
import { refetchUser } from "../ajax/auth";

class MyMessages extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
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

export default MyMessages
