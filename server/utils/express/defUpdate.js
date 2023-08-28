const { defAnswerError } = require("./defAnswer");
const { checkVal } = require("./middleware");

const defUpdate = (model) => [
  checkVal(["id"], "body"),
  (req, res) => {
    const { id, ...other } = req.body;
    if (model) {
      model.update(other, { where: { id } }).defAnswer(res);
      return;
    }
    defAnswerError(res)("model not found");
  },
];

module.exports = { defUpdate };
