const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      icon: DataTypes.TEXT,
      color: DataTypes.TEXT,
      bgColor: DataTypes.TEXT,
    },
    defOptions
  );

  return model;
};
