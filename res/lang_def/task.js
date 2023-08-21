const root = {
  top: {
    edit: "Редактировать язык",
    add: "Добавить язык",
    delete: "Удалить язык",
    search: "Поиск ...",
    reload: "Перезагрузить язык",
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
      dialogCaption: "Выполнить <strong>{{value}}</strong>",
      param: "Параметры",
      data: "Дополнительно",
      save: "Сохранить",
      cancel: "Отмена",
      validate: {
        mustCharGreater: "Количество символов должно быть больше ${val}",
        mustCharLess: "Количество символов должно быть меньше ${val}",
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
