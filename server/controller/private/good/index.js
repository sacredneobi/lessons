const { Op } = require("sequelize");
const { good } = require("@models");
const { checkVal, parseLimit, defExclude } = require("@utils");

const getById = (req, res) => {
  const { id } = req.params;
  good.findOne({ ...defExclude(), where: { id } }).defAnswer(res);
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  good
    .findAndCountAll({
      ...defExclude(),
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .defAnswer(res);
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  good.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  good.create(req.body).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", parseLimit, get);
  router.get("/:id", getById);
  router.put("/", checkVal(["id"], "body"), update);
  router.post("/", post);

  return true;
};
