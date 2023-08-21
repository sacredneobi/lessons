const root = {
  expandMore: 'Развернуть "{{value}}"',
  expandLess: 'Свернуть "{{value}}"',
  users: "Пользователи",
  service: "Сервис",
  translate: "Перевод",
  task: "Скрипты",
  settings: "Настройки",
  role: "Доступ",
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
