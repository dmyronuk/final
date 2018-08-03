import React from "react";

const YelpResults = (props) => {
  const searchTerm = props.searchTerm[0].toUpperCase() + props.searchTerm.slice(1)

  return(
    <div className="default-flex-column-container">
      <div className="search-category">
        <h3>Local {searchTerm}</h3>
      </div>
      { props.results.map(amenity => {
        const distance = Math.round(amenity.distance) + "m"
        return(
          <a href={amenity.url}>
            <div key={amenity.id} className="yelp-results-item">
              <header>{amenity.name}</header>
              <div className="image-container">
                <img alt={amenity.name + "image"} src={amenity.image_url}/>
              </div>
              <div className="yelp-results-info-container">
                <div>{distance}</div>
                <div>{amenity.location.address1}</div>
                <div>{amenity.display_phone}</div>
                <div>{amenity.rating}</div>
              </div>
            </div>
          </a>
          )
        })
      }
    </div>
  )
}

export default YelpResults;

