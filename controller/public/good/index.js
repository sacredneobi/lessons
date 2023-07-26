const models = require("@models");
const { checkVal } = require("@utils");

const name = "good";
const model = models[name];

const get = (req, res) => {
  const { id } = req.query;

  if (id) {
    model.findOne({ where: { id } }).defAnswer(res);
    return;
  }

  model.findAndCountAll().defAnswer(res);
};

const post = (req, res) => {
  const { ...other } = req.body;
  model.create(other).defAnswer(res);
};

const put = (req, res) => {
  const { id, ...other } = req.body;
  model.update(other, { where: { id } }).defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.body;
  model.destroy({ where: { id } }).defAnswer(res);
};

module.exports = (router, moduleName) => {
  router.get("/", get);
  router.post("/", post);
  router.put("/", checkVal(["id"], "body"), put);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
