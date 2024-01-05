const defLimit = (data) => {
  const { limit, offset } = data;

  return {
    ...(limit && parseInt(limit) ? { limit } : {}),
    ...(offset && parseInt(offset) ? { offset } : {}),
  };
};

module.exports = { defLimit };
