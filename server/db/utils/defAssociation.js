const getDefAssociation = (model, belongsTo) => {
  model.belongsTo(belongsTo, {
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });
};

module.exports = { getDefAssociation };
