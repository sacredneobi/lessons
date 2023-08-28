const root = {
  tabs: {
    errorInput: "Есть незаполненные обязательные поля",
    doneInput: "Все требуемые поля заполнены",
  },
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
