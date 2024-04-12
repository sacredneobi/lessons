const { DataTypes } = require("sequelize");
const { getDefColumns } = require("../../utils/defColumns");
const { getDefAssociation } = require("../../utils/defAssociation");

const columns = [
  { name: "caption", type: DataTypes.TEXT, search: true },
  { name: "description", type: DataTypes.TEXT, search: true },
  { name: "article", type: DataTypes.TEXT, search: true },
  { name: "color", type: DataTypes.TEXT, search: true },
];

module.exports = (db, defOptions, modelName) => {
  const model = db.define(modelName, getDefColumns(columns), defOptions);

  model.fullColumns = columns;

  model.associate = (models) => {
    getDefAssociation(model, models.good);
  };

  return model;
};
