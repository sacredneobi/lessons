const getDefColumns = (columns) => {
  if (!Array.isArray(columns)) {
    return {};
  }

  return columns.reduce((prev, item) => {
    prev[item.name] = item.type;
    if (item.set || item.get) {
      prev[item.name].type = item.type;
      if (item.set) {
        prev[item.name].set = item.set;
      }
      if (item.get) {
        prev[item.name].get = item.get;
      }
    }
    return prev;
  }, {});
};

module.exports = { getDefColumns };
