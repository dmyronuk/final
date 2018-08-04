//request to get other users' info for chat
//need to send token to authenticate
const getUsernameById = async (otherUserId, token) => {
  const url = `/api/users/${otherUserId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();

  if (response.status !== 200){
    throw Error(data.message);
  }
  return data;
}

const getAllMessages = async () => {
  const response = await fetch("/api/messages");
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

const getFilteredMessages = async (sender, recipient) => {
  const response = await fetch(`/api/filtered-messages?sender=${sender}&recipient=${recipient}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

export {
  getUsernameById,
  getAllMessages,
  getFilteredMessages,
}