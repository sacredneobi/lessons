const root = {
  menu: "Управление задачами",
  availableWithParams: "Доступно с параметрами",
  logout: "Выйти из системы",
  empty: "Пока нет уведомлений",
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
