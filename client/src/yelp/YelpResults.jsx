import React from "react";

const YelpResults = (props) => {

  return(
    <div className="default-flex-column-container">
      <h3> </h3>
      { props.results.map(amenity => {
        const distance = Math.round(amenity.distance) + "m"
        return(
            <div className="yelp-results-item">
              <div>{amenity.name}</div>
              <div>
                <img src={amenity.image_url}/>
              </div>
              <div>{distance}</div>
              <div>{amenity.location.address1}</div>
              <div>{amenity.display_phone}</div>
              <div>{amenity.rating}</div>
              <a href={amenity.url}>
                Link
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

export default YelpResults;

