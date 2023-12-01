const getStoreData = (name) => {
  let data = {};
  try {
    const readData = localStorage.getItem(name);

    if (readData && readData.trim() !== "") {
      data = JSON.parse(readData);
    }
  } catch (err) {
    data = {};
    console.log(err);
  }
  return data;
};

export { getStoreData };
