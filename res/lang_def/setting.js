const root = {
  caption: "Цветовая тема",
  light: "Светлая",
  system: "Системная",
  dark: "Темная",
  selectLang: "Выберите язык",
  update: "Обновление",
  availableUpdate: "Доступно обновление v{{value}}",
  checkUpdate: "Проверить обновление",
  expandUpdate: "Подробно",
  weightIcon: "Толщина иконок",
  fillIcon: "Заполнение иконок",
  icon: "Настройка иконок",
  availableNotAvailable: "Установлена актуальная версия",
  message: "Сообщения",
  hideMessageAllStore: "Скрыть сообщение о отображении по всем магазинам",
  lang: "Выберите язык",
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
