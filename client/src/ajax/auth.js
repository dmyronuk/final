const signup = async (userObj) => {
  const response = await fetch("/api/signup");
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

const login = async (userObj) => {
  const response = await fetch("/api/login");
  const data = await response.json();
  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

export {
  signup,
  login,
}