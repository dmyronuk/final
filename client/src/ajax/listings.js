const getAllListings = async () => {
  const response = await fetch("/api/listings");
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message)
  }
  return data
}

export {
  getAllListings
}