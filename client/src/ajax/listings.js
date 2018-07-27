const getAllListings = async () => {
  const response = await fetch("/listings");
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message)
  }
  return JSON.parse(data)
}

export {
  getAllListings
}