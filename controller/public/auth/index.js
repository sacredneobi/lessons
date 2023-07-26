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
        return {
          token: jwtCreate({ id: data.id }),
          userCaption: data.login,
        };
      }
      throw new Error("Auth error");
    })
    .defAnswer(res, 401, { msg: "Auth error" });
};

module.exports = (router, moduleName) => {
  router.get("/", get);

  return true;
};
