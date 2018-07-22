import React, { Component } from "react";
import { Link } from "react-router-dom";

class TranscriptionForm extends Component{
  constructor(props){
    super(props)
  }


  componentDidMount(){

  }

  createWhat = () => {
    let inputArr = [];
    for(let i=0; i<16; i++){
      let bar = (
        <div className="bar-container">
          <input bar={i} beat={1} className="chord-input" type="text"/>
          <input bar={i} beat={2} className="chord-input" type="text"/>
          <input bar={i} beat={3}  className="chord-input" type="text"/>
          <input bar={i} beat={4} className="chord-input" type="text"/>
        </div>
      )
      inputArr.push(bar)
    }
    return inputArr;
  }

  render(){

    return(
      <div className="transcription-container">
        <form>
          {this.createWhat()}
        </form>

      </div>
    )
  }
}

export default TranscriptionForm