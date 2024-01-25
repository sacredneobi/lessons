const createMultiPart = (data, arrFile = []) => {
  const result = new FormData();

  const newData = Object.keys(data).reduce((prev, item) => {
    if (arrFile.includes(item)) {
      if (data[item]?.data instanceof File) {
        result.append(data[item].caption, data[item]?.data);
      }
      if (Array.isArray(data[item])) {
        data[item].forEach((item) => {
          if (item.data instanceof File) {
            result.append(item.caption, item.data);
          }
        });
      }
    } else {
      if (data[item]?.preview) {
        result.append(data[item].caption, data[item]?.data);
      } else {
        prev[item] = data[item];
      }
    }

    return prev;
  }, {});

  result.append("data", JSON.stringify(newData));

  return result;
};

export { createMultiPart };
