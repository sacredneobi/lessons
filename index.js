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

//Алгоритм луна, проверка карты

const checkCreditCard = (card) => {
  const check = card
    .split("")
    .filter((item) => item !== " ")
    .map((item) => parseInt(item))
    .filter((item) => item);

  if (check.length !== 16) {
    return false;
  }

  const result = check.map((item, index) => {
    let current = item;

    if (index % 2 === 0) {
      current = current * 2;

      if (current > 9) {
        current = String(current)
          .split("")
          .reduce((prev, item) => prev + parseInt(item), 0);
      }
    }
    return current;
  });

  return result.reduce((prev, item) => prev + item, 0) % 10 === 0;
};

const test = "4242 4242 4242 4242";
console.log(checkCreditCard(test));
