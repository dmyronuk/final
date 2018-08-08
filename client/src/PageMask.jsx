import React from "react";

//black mask that hides the window when we click on the sidebar
//when the sidebar is open we can click on the mask and it will hide the sidbar and mask
//we only want to attach the toggle handler if the mask is always visible
const PageMask = (props) => {
  return <div className={props.toggleState + " page-mask"} onClick={props.maskClickHandler} />
}

export default PageMask

