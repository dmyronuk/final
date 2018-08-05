const signup = async (userObj) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(userObj),
  });
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data
}

const login = async (userObj) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(userObj),
  });
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

//when user types something into the address bar we lose state
//we use this route in the app constructor to use JWT to refetch user details
const refetchUser = async (jwtObj) => {
  const response = await fetch("/api/profile", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(jwtObj),
  });
  if (response.status !== 200){
    localStorage.removeItem("JWT_TOKEN")
    return({data: null})
  }else{
    const data = await response.json();
    return data;
  }
}

const fetchLandlord = async (jwtObj) => {
  const response = await fetch("/api/landlord", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(jwtObj),
  });
  const data = await response.json();
    if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

export {
  signup,
  login,
  refetchUser,
  fetchLandlord,
}

