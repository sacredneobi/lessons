const { Op } = require("sequelize");
const { userRole: model } = require("@models");
const { defDelete, defUpdate } = require("@utils");

const get = (req, res) => {
  const { id, search, limit, offset } = req.query;

  if (id) {
    model.findOne({ ...defExclude(), where: { id } }).defAnswer(res);
    return;
  }

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  model
    .findAndCountAll({
      ...defExclude(),
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .defAnswer(res);
};

const post = (req, res) => {
  const { ...other } = req.body;
  model.create(other).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.post("/", post);
  router.put("/", ...defUpdate(model));
  router.delete("/", ...defDelete(model));

  return !!model;
};
