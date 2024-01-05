const { Op } = require("sequelize");
const { good } = require("@models");
const { checkVal, parseLimit, defExclude, defLimit } = require("@utils");

const getById = (req, res) => {
  const { id } = req.params;
  good.findOne({ ...defExclude(), where: { id } }).defAnswer(res);
};

const get = (req, res) => {
  const { search } = req.query;

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  good
    .findAndCountAll({ ...defExclude(), where, ...defLimit(req.query) })
    .defAnswer(res);
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  good.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  good.create(req.body).defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.body;
  good.destroy({ where: { id } }).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", parseLimit, get);
  router.get("/:id", getById);
  router.put("/", checkVal(["id"], "body"), update);
  router.post("/", post);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
