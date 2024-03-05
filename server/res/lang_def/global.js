const root = {
  dialog: {
    action: {
      create: "Создать",
      save: "Сохранить",
      cancel: "Отменить",
    },
  },
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
