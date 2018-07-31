const getAllRatingsOfUser = async (user) => {
  const response = await fetch(`/api/ratings?user_id=${user}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

export {
  getAllRatingsOfUser,
}