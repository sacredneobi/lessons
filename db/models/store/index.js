const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName, defField) => {
  const model = db.define(
    modelName,
    {
      ...defField,
    },
    defOptions
  );

  return model;
};
