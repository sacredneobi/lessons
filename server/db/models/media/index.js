const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      fileId: DataTypes.TEXT,
      name: DataTypes.TEXT,
      size: DataTypes.INTEGER,
      mimeType: DataTypes.TEXT,
    },
    defOptions
  );

  model.associate = (models) => {
    model.belongsTo(models.user, {
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
    model.belongsTo(models.good, {
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};
