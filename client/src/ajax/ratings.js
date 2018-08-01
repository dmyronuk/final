const getAllRatingsThatUserRated = async (user) => {
  const response = await fetch(`/api/ratings?user_id=${user}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

const getAllRatingsOfRatee = async (user) => {
  const response = await fetch(`/api/ratee?user_id=${user}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

export {
  getAllRatingsThatUserRated,
  getAllRatingsOfRatee,
}