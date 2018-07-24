import React from "react";
import FormBar from "./FormBar";

function FormLine(props){
  let firstBar = (props.line - 1) * 4 + 1;
  return(
    <div className="line-container">
      <FormBar key={"bar-" + firstBar} bar={firstBar} />
      <FormBar key={"bar-" + firstBar + 1} bar={firstBar + 1} />
      <FormBar key={"bar-" + firstBar + 2} bar={firstBar + 2}/>
      <FormBar key={"bar-" + firstBar + 3} bar={firstBar + 3}/>
    </div>
  )
}

export default FormLine