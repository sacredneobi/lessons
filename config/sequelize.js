const { Op } = require("sequelize");

Op.getLike = function () {
  if (process.setting.db.dialect === "postgres") {
    return this.iLike;
  }
  return this.like;
};
