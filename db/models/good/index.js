const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    defOptions
  );

  model.associate = (models) => {
    model.belongsTo(models.store, {
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };

  return model;
};
