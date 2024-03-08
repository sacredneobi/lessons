const parse = (data, def) => {
  let result;
  try {
    if (data && String(data) !== "") {
      result = JSON.parse(data);
    }
  } catch (err) {
    console.log(err);
  }

  return result ?? def;
};

export { parse };
