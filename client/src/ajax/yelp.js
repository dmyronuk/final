//searchRequest object should contain latitude str, longitude str, radius str, term str
//term examples: education, restaurants
const categorySearchByLocation = async (searchRequest) => {
  const url = `/api/listings/:id/yelp`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchRequest),
  });
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

export {
  categorySearchByLocation,
}


