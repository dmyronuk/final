import React, { Component } from "react";
import FormLine from "./FormLine"

class TranscriptionPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      chords: new Array(32).fill("")
    }
  }

  componentDidMount(){

  }

  createLines = () => {
    //16 chords maps to 4 bars of 4/4 time so
    let lines = this.state.chords.map((elem, i) => {
      let lineNum = (i + 1) / 16
      if((i + 1) % 16 === 0){
        return <FormLine key={"line-" + lineNum} line={lineNum} />
      }
    })
    return lines;
  }

  render(){

    return(
      <div className="transcription-page">
        <header>
          <div>
            <h1>Song Title</h1>
          </div>
          <div className="artist-h2-container">
            <h2>Artist</h2>
          </div>
        </header>

        <form>
          {this.createLines()}
        </form>

      </div>
    )
  }
}

export default TranscriptionPage