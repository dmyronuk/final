import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentList extends Component{
  constructor(props){
    super(props)
    this.state = {
      students: null
    }
  }

  getAllStudentInfo = async () => {
      const response = await fetch("/students");
      const data = await response.json();
      if (response.status !== 200){
        throw Error(data.message)
      }
      return data
    }

  componentDidMount(){
    this.getAllStudentInfo()
    .then(data => {
      let students = JSON.parse(data);
      this.setState({students})
    })
  }

  render(){
    return(
      <div>
        {this.state.students &&
          <table className="student-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(elem =>
                <tr key={elem.id}>
                  <td>{ elem.first_name } { elem.last_name }</td>
                  <td>{ elem.grade }</td>
                  <td>
                    <Link to={`/students/${elem.id}/lessons`}>link</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default StudentList