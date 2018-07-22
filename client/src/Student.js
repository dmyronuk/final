import React, { Component } from "react";
import { Link } from "react-router-dom";
import time from "./helpers/time-formatters";

class Student extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }

  getStudentInfo = async () => {
    const response = await fetch(`/students/${this.state.id}`);
    const data = await response.json();
    if (response.status !== 200){
      throw Error(data.message)
    }
    return data
  }

  getStudentLessons = async () => {
    const response = await fetch(`/students/${this.state.id}/lessons`);
    const data = await response.json();
    if (response.status !== 200){
      throw Error(data.message)
    }
    return data
  }

  componentDidMount(){
    this.getStudentInfo()
    .then(data => {
      this.setState({
        first_name: data.first_name,
        last_name: data.last_name,
        grade: data.grade,
        active: data.active,
      })
    })

    this.getStudentLessons()
    .then(data => {
      this.setState({ lessons: data })
    })

  }

  render(){
    return(
      <div>
        {this.state.first_name &&
          <div>
            <div>{this.state.first_name} {this.state.last_name}</div>
            <div>Grade: {this.state.grade}</div>
          </div>
        }

        {this.state.lessons &&
          <table>
            <thead>
              <tr>
                <th>Lesson Date</th>
                <th>Lesson Time</th>
                <th>Length (min)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.lessons.map((lesson, i) =>
                <tr key={i}>
                  <td>{time.dateFromUnix(lesson.time)}</td>
                  <td>{time.timeFromUnix(lesson.time)}</td>
                  <td>{lesson.duration}</td>
                </tr>
              )}
            </tbody>
        </table>
        }
        <Link to={"/students"}>back</Link>
      </div>
    )
  }
}

export default Student