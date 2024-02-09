const models = require("@models");
const { jwtCreate, defExclude } = require("@utils");
const { HasOne } = require("sequelize");

const name = "user";
const model = models[name];

const post = (req, res) => {
  const { login, password } = req.body;

  model
    .findOne({
      ...defExclude(["password"]),
      where: { login, password },
    })
    .defJSON()
    .then((data) => {
      if (data?.id) {
        return {
          isAuth: true,
          accessToken: jwtCreate({ id: data.id }),
          userCaption: data?.login,
          title: process.setting.title,
          version: process.setting.version,
        };
      }
      throw new Error("Auth error");
    })
    .defAnswer(res, 401, { msg: "Auth error" });
};

module.exports = (router, moduleName) => {
  router.post("/", post);

  return true;
};
