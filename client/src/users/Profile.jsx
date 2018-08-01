import React, { Component } from "react";
import { getUserProfile } from "../ajax/profile";
import { getAllRatingsOfUser } from "../ajax/ratings";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    const tokenObj = {token: localStorage.getItem("JWT_TOKEN")};
    const profileData = getUserProfile(tokenObj);
  }

  render(){
    return(
      <div>My Profile</div>
    )
  }
}

export default Profile
