import React from "react";
import ReactStars from "react-stars";

const YelpResults = (props) => {
  const searchTerm = props.searchTerm[0].toUpperCase() + props.searchTerm.slice(1)
  const columnStyle = {height: props.height}
  console.log("Yelp style", columnStyle)



  return(
    <div className="default-flex-column-container" style={columnStyle}>
      <div className="search-category">
        <h3>Local {searchTerm}</h3>
      </div>
      {props.results.map(amenity => {
        const distance = Math.round(amenity.distance) + "m"
        return(
          <a key={amenity.id} href={amenity.url}>
            <div className="yelp-results-item">
              <header>{amenity.name}</header>
              <div className="image-container">
                <img
                  alt={amenity.name + "image"}
                  src={amenity.image_url}
                  onError={(e) => { e.target.src = "/images/no-image.jpg" }}
                />
              </div>
              <div className="yelp-results-info-container">
                <div>{distance}</div>
                <div>{amenity.location.address1}</div>
                <div>{amenity.display_phone}</div>
                {/* <div>{amenity.rating}</div> */}
                <ReactStars
                  half={true}
                  edit={false}
                  size={20}
                  value={amenity.rating}
                />
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

