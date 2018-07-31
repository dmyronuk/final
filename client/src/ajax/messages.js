const getAllMessages = async () => {
  const response = await fetch("/api/messages");
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

const getFilteredMessages = async (sender, recipient) => {
  // const response = await fetch(`/api/filtered-messages?sender=${sender}&recipient=${recipient}`);
  // const data = await response.json();
  // if (response.status !== 200) {
  //   throw Error(data.message);
  // }
  // return data;
}

export {
  getAllMessages,
  getFilteredMessages,
}