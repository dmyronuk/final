import React from "react";
import CityImage from "./images/grey-aerial.jpg";

const BackgroundImage = (props) => {
  return(
    <div className="main-bg-container">
      <img alt="CityImage" src={ CityImage } />
    </div>
  )
}

export default BackgroundImage;