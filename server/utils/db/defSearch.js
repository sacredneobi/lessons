const { DataTypes } = require("sequelize");

const defSearch = (model, data) => {
  const { search } = data ?? {};

  let columns;

  if (model) {
    columns = model?.fullColumns?.map((item) => ({
      name: `good.${item.name}`,
      type: item.type?.key?.toLowerCase?.(),
    }));
  }

  if (!search || !model) {
    return { columns };
  }

  const where =
    model?.fullColumns?.reduce((prev, item) => {
      prev[item.name] =
        item.type === DataTypes.TEXT
          ? { [Op.getLike()]: `%${search}%` }
          : search;
      return prev;
    }, {}) ?? null;

  return { where, columns };
};

module.exports = { defSearch };
