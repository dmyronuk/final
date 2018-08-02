const getAllThreads = async () => {
  const response = await fetch("/api/threads");
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
}

export {
  getAllThreads,
}