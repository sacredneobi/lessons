const jwt = require("jsonwebtoken");
const config = require("@config/config.json");
const models = require("@models");

const password = config?.jwt ?? "123";

const jwtCreate = (data) => jwt.sign(data, password, { noTimestamp: true });

const jwtVal = (token) => {
  try {
    return jwt.verify(token, password);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !jwtVal(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  req.userData = await models.user.findOne({
    where: { id: jwtVal(authorization)?.id },
  });

  next();
};

module.exports = { jwtCreate, jwtVal, jwtMiddleware };
