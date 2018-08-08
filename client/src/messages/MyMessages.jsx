import React, { Component } from "react";
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
    document.title = "Messages | Kiro";
    if(localStorage.JWT_TOKEN){
      this.props.setNextRedirectUrl("/");
      refetchUser({token: localStorage.JWT_TOKEN})
      .then(user => {
        getAllThreads(user.id)
        .then(threads => {
          const noMessages = threads.length === 0;
          this.setState({
            threads, noMessages
          })
        })
      })
    }else{
      this.props.setNextRedirectUrl("/messages");
    }
  }

  render(){
    return(
      <div>
        <BackgroundImage />
        {!localStorage.JWT_TOKEN && <Redirect to="/login"/>}
        {this.state.threads &&
          <div className="default-flex-column-container conversations-container">
            <div>
              <table>
                <tbody>
                  <tr>
                    <th colSpan={2}>Messages</th>
                  </tr>
                  {this.state.threads.map((data, i) => {
                    return <SingleThread key={i} theKey={i} thread={data}/>
                  })}
                  {this.state.noMessages &&
                    <tr>
                      <td colSpan={2}> You currently have no messages</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default MyMessages
