const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      name: DataTypes.TEXT,
      size: DataTypes.FLOAT,
      mimeType: DataTypes.TEXT,
      fileId: DataTypes.TEXT,
    },
    defOptions
  );

  return model;
};
