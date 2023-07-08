const { Op } = require("sequelize");
const { user } = require("@models");
const { checkVal } = require("@utils");

const getURI = (req, res) => {
  const { id } = req.params;

  user
    .findOne({ where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;

  process.myEvents?.emit("sacred", req.userData);
  process.myEvents?.emit("new order", req.userData);

  if (!req.userData?.role?.getUser) {
    res
      .status(401)
      .send({ error: `${req.userData.caption} not access to get user` });
    return;
  }

  console.log(req.userData.toJSON());

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  user
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const update = (req, res) => {
  const { id, ...other } = req.body;

  user
    .update(other, { where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);

  router.put("/", checkVal(["id"], "body"), update);

  return true;
};
