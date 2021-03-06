const getUserProfile = async (tokenObj) => {
  const response = await fetch("/api/profile", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenObj),
  });
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  console.log("Response to profile request back from server to client:", data)
  return data;
}

const getUserFromLandlordId = async (landlordId) => {
  const response = await fetch(`/api/get-user-from-landlord-id?landlord_id=${landlordId}`);
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

export {
  getUserProfile,
  getUserFromLandlordId,
}