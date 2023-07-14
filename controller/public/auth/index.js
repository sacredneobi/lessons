const models = require("@models");
const { jwtCreate } = require("@utils");

const name = "user";
const model = models[name];

const get = (req, res) => {
  const { login, password } = req.query;

  model
    .findOne({ where: { login, password } })
    .then((data) => {
      if (data) {
        res.send({
          token: jwtCreate({ id: data.id }),
          userCaption: data.login,
        });
        return;
      }

      res.status(401).send({ msg: "Auth error" });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ msg: "Auth error" });
    });
};

//http://localhost/api/auth?login=123&password=123

module.exports = (router, moduleName) => {
  router.get("/", get);

  return true;
};
