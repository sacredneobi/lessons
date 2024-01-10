const { DataTypes } = require("sequelize");

const columns = [
  { name: "caption", type: DataTypes.TEXT, search: true },
  { name: "description", type: DataTypes.TEXT, search: true },
  { name: "article", type: DataTypes.TEXT, search: true },
];

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    columns.reduce((prev, item) => {
      prev[item.name] = item.type;
      return prev;
    }, {}),
    defOptions
  );

  model.fullColumns = columns;

  return model;
};
