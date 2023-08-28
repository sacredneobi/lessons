const defExclude = (other = [], include) => ({
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt", ...other],
    include: include,
  },
});

module.exports = { defExclude };
