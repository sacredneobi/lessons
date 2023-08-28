const root = {
  APIDefault: "Ошибка входа {{value}}",
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
