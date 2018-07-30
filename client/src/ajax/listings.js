const getAllListings = async () => {
  const response = await fetch("/api/listings");
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

const getAllListingsFromQuery = async (queryObj) => {
  const response = await fetch("/api/listings/search", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(queryObj),
  })

  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

const getSingleListing = async (id) => {
  const url = `/api/listings/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data[0];
}

export {
  getAllListings,
  getSingleListing,
  getAllListingsFromQuery
}