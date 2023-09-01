const jwt = require("jsonwebtoken");
const models = require("@models");
const { HasMany, HasOne } = require("sequelize");
const { defExclude } = require("../db");

const password = process.setting?.jwt ?? "123";

const jwtCreate = (data) => jwt.sign(data, password, { noTimestamp: true });

const jwtVal = (token) => {
  try {
    return jwt.verify(token, password);
  } catch (err) {
    console.error("JWT", err);
    return false;
  }
};

const jwtMiddleware = async (req, res, next) => {
  const { authorization: authorizationProps } = req.headers;

  const authorization = authorizationProps?.replaceAll("JWT ", "");

  if (!authorization || !jwtVal(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  req.userData = await models.user.findOne({
    ...defExclude(["password"]),
    include: [
      {
        association: new HasMany(models.user, models.userRole, {
          sourceKey: "id",
          foreignKey: "userId",
        }),
        ...defExclude(),
      },
      {
        association: new HasOne(models.user, models.media, {
          sourceKey: "id",
          foreignKey: "userId",
          as: "media",
        }),
        attributes: ["fileId"],
      },
    ],
    where: { id: jwtVal(authorization)?.id },
  });

  if (req.userData?.isAdmin || req.userData?.isSuperAdmin) {
    next();
    return;
  }

  const findAccess = req.userData?.userRoles?.find(
    (item) =>
      item.controller ===
      req.baseUrl.replaceAll("/api/private/", "").replaceAll("/", "")
  );
  if (findAccess) {
    next();
    return;
  }
  res.status(401).send("user not found");
};

module.exports = { jwtCreate, jwtVal, jwtMiddleware };
