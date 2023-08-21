const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      code: DataTypes.TEXT,
      altName: DataTypes.TEXT,
      isShow: DataTypes.BOOLEAN,
      isDefClient: DataTypes.BOOLEAN,
      isDefSystem: DataTypes.BOOLEAN,
    },
    defOptions
  );

  return model;
};
