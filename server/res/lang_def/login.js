const root = {
  buttonLogin: "Войти",
  logo: "Войти в систему",
  login: "логин",
  password: "пароль",
  validate: {
    mustCharGreater: "Количество символов должно быть больше ${val}",
    mustCharLess: "Количество символов должно быть меньше ${val}",
  },
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
