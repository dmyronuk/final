import React from "react";

function FormBar(props){
  return(
    <div>
      <input beat={1} className="chord-input" type="text"/>
      <input beat={2} className="chord-input" type="text"/>
      <input beat={3}  className="chord-input" type="text"/>
      <input beat={4} className="chord-input" type="text"/>
    </div>
  )
}

export default FormBar