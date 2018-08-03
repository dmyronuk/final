const getAllThreads = async (userId) => {
  const response = await fetch(`/api/threads?user_id=${userId}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

export {
  getAllThreads,
}