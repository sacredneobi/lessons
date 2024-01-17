const createMultiPart = (data) => {
  const result = new FormData();

  const newData = Object.keys(data).reduce((prev, item) => {
    if (data[item]?.preview) {
      result.append(data[item].caption, data[item]?.data);
    } else {
      prev[item] = data[item];
    }
    return prev;
  }, {});

  result.append("data", JSON.stringify(newData));

  return result;
};

export { createMultiPart };
