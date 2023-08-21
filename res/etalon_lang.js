const root = {
  top: {
    edit: "Редактировать язык",
    add: "Добавить язык",
    delete: "Удалить язык",
    reload: "Перезагрузить язык",
    search: "Поиск ...",
  },
  table: {
    count: "Выбрано",
    empty: "Список пуст",
  },
  header: {
    edit: "Сохранить",
    delete: "Удалить",
    successCopy: "Скопировано в буфер обмена",
    errorCopy: "Ошибка копирования: \n{{value}}",
    notFillParams: "В переводе нет переменных: {{value}}",
  },
  dialog: {
    edit: {
      dialogCaption: "Редактировать <strong>{{value}}</strong>",
      caption: "Название",
      description: "Описание",
      save: "Сохранить",
      cancel: "Отмена",
      validate: {
        mustCharGreater: "Символов должно быть больше ${val}",
        mustCharLess: "Символов должно быть меньше ${val}",
        mustSelect: "Необходимо выбрать",
      },
      tabs: {
        setting: "Общие параметры",
      },
    },
    create: {
      dialogCaption: "Создать",
    },
    delete: {
      dialogCaption: "Удалить",
      emptyData: "Ошибка получения данных",
      cancel: "Отмена",
      ok: "Удалить",
    },
  },
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
