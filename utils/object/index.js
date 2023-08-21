// NOT UNIC @utils/lang
const readObj = (obj, path) => {
  for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
    obj = obj[path[i]];
    if (!obj) {
      return undefined;
    }
  }
  return obj;
};

// NOT UNIC @utils/lang
const writeObj = (obj, path, value) => {
  for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
    if (i + 1 === len) {
      obj[path[i]] = value;
    } else {
      if (!obj[path[i]]) {
        obj[path[i]] = {};
      }
      obj = obj[path[i]];
    }
  }
};

module.exports = { readObj, writeObj };
