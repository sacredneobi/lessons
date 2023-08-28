const { defAnswerError } = require("./defAnswer");
const { checkVal } = require("./middleware");

const defDelete = (model) => [
  checkVal(["id"], "body"),
  (req, res) => {
    const { id } = req.body;
    if (model) {
      model.destroy({ where: { id } }).defAnswer(res);
      return;
    }
    defAnswerError(res)("model not found");
  },
];

module.exports = { defDelete };
