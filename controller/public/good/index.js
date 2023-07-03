const models = require("../../../db/models");

const name = "good";
const model = models[name];

const get = (req, res) => {
  const { id } = req.query;

  if (id) {
    model
      .findOne({ where: { id } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    return;
  }

  model
    .findAndCountAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const post = (req, res) => {
  const { ...other } = req.body;
  model
    .create(other)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  const { id, ...other } = req.body;

  if (id) {
    model
      .update(other, { where: { id } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

const del = (req, res) => {
  const { id } = req.body;

  if (id) {
    model
      .destroy({ where: { id } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

module.exports = (router, moduleName) => {
  router.get("/", get);
  router.post("/", post);
  router.put("/", put);
  router.delete("/", del);

  return true;
};
