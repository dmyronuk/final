import React from "react";
import { Route } from "react-router-dom";
import StudentList from "./StudentList";
import TranscriptionFormPage from "./transcription-form/TranscriptionFormPage";
import Student from "./Student";

function Main(props){
  return(
    <main>
      <Route path='/students/:id' component={ Student }/>
      <Route exact path='/students' component={ StudentList }/>
      <Route exact path='/transcription' component={ TranscriptionFormPage }/>
    </main>
  )
}

export default Main;