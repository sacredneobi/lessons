const { DataTypes } = require("sequelize");
const { getDefColumns } = require("../../utils/defColumns");

const columns = [
  { name: "caption", type: DataTypes.TEXT, search: true },
  { name: "description", type: DataTypes.TEXT, search: true },
  {
    name: "otherId",
    type: DataTypes.TEXT,
    set(value) {
      this.setDataValue(
        "otherId",
        value === 0 || value === false ? null : value && String(value)
      );
    },
  },
];

module.exports = (db, defOptions, modelName) => {
  const model = db.define(modelName, getDefColumns(columns), defOptions);

  model.fullColumns = columns;

  return model;
};
