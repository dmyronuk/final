import React, { Component } from "react";
import { getUserProfile } from "../ajax/profile";
import { getAllRatingsOfUser } from "../ajax/ratings";
import { getAllThreads } from "../ajax/threads";
import SingleThread  from "./SingleThread.jsx";
import { refetchUser } from "../ajax/auth";
import { Redirect } from "react-router-dom";
import BackgroundImage from "../BackgroundImage";



class MyMessages extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    document.title = `Messages | Kiro `
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
        <BackgroundImage />
        {!localStorage.JWT_TOKEN && <Redirect to="/login"/> }
        {this.state.threads &&
          <div className="default-flex-column-container converstions-container">
            <table>
              <tr>
                <th colspan={3}>Messages</th>
              </tr>
              {this.state.threads.map((data, i) => {
                return <SingleThread key={i} theKey={i} thread={data}/>
              })}
            </table>
          </div>
        }
      </div>

    )
  }
}

export default MyMessages
