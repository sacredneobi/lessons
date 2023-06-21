const { Op } = require("sequelize");
const models = require("./db/models");
const express = require("express");

const app = express();

const router = new express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  const { search } = req.query;

  models.user
    .findAll(
      search
        ? {
            logging: console.log,
            where: {
              description: { [Op.like]: `%${search}%` },
            },
          }
        : {}
    )
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.post("/", (req, res) => {
  models.user
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.use("/user", router);

app.listen(8989, () => {
  console.log("server listen on port: 8989");
});
