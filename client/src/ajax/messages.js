const getAllMessages = async () => {
  const response = await fetch("/api/messages");
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}


export {
  getAllMessages,
}