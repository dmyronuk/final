import React, { Component } from "react";

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
        Listings
      </div>
    )
  }
}

export default StudentList