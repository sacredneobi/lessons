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
    return data ?? {};
  });
};
