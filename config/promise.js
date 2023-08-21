const { defAnswer, defAnswerError } = require("@utils");

Promise.prototype.defAnswer = function (res, errorStatus = 500, errorMessage) {
  return this.then(defAnswer(res)).catch(
    defAnswerError(res, errorStatus, errorMessage)
  );
};

Promise.prototype.defJSON = function (res, errorStatus = 500, errorMessage) {
  return this.then((data) => {
    if (typeof data?.toJSON === "function") {
      return data.toJSON();
    }
    if (Array.isArray(data)) {
      return data.map((item) => {
        if (typeof item?.toJSON === "function") {
          return item.toJSON();
        }
      });
    }
    return data ? data : {};
  });
};

Promise.prototype.dropAttributes = function (arr, isUpdate) {
  return Array.isArray(arr) && arr.length > 0
    ? this.then((data) => {
        let newData;
        if (!isUpdate) {
          newData = typeof data?.toJSON === "function" ? data.toJSON() : data;
        } else {
          let test;
          if (data?.[1]) {
            test = data[1];
          } else {
            test = data[0];
          }
          newData = typeof test?.toJSON === "function" ? test.toJSON() : test;
        }
        arr.forEach((item) => {
          console.log(item, newData);
          delete newData[item];
        });
        return newData;
      })
    : this;
};
