const { Op, HasMany } = require("sequelize");
const { media } = require("@models");
const { defExclude } = require("./defExclude");

const attr = ["id", "fileId", "name", "size", "mimeType"];

const getMedia = (model) => {
  if (!model) {
    return {};
  }
  return {
    association: new HasMany(model, media, {
      sourceKey: "id",
      foreignKey: `${model.name}Id`,
    }),
    attributes: [...attr, `${model.name}Id`],
  };
};

module.exports = { getMedia };
