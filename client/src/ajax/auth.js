// localStorage.setItem('myCat', 'Tom');
// var cat = localStorage.getItem('myCat');
// localStorage.removeItem('myCat');
// localStorage.clear();


const signup = async (userObj) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    mode: "cors",
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