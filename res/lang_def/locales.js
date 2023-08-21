const root = {
  tabs: {
    admin: "Админка",
    client: "Клиент",
    system: "Системные",
  },
  top: {
    local: "Язык",
    edit: "Редактировать язык",
    add: "Добавить язык",
    delete: "Удалить язык",
    reload: "Перезагрузить язык",
    download: "Выгрузить файл перевода",
    upload: "Загрузить файл перевода",
    switchToClient: "Клиент",
    switchToAdmin: "Админка",
    isDefSystem: "По умолчанию для системы",
    selectAll: "Выбор элементов",
    back: "Вернуться назад",
    actions: {
      caption: "Действия",
      edit: "Редактировать",
      add: "Добавить",
      delete: "Удалить",
    },
    search: "Поиск",
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
      lngCaption: "Заголовок",
      code: "Код",
      altName: "Альтернативное название",
      save: "Сохранить",
      cancel: "Отмена",
      isDefClient: "По умолчанию для клиента",
      isDefSystem: "По умолчанию для системы",
      isShow: "Показывать на главной странице",
      validate: {
        mustCharGreater: "Количество символов должно быть больше ${val}",
        mustCharLess: "Количество символов должно быть меньше ${val}",
      },
      tabs: {
        setting: "Общие параметры",
        addons: "Дополнительно",
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
