const root = {
  header: {
    admin: "Администратор",
    superAdmin: "Хозяин",
    actions: {
      caption: "Действия",
      edit: "Редактировать",
      delete: "Удалить",
      role: "Настройка доступа",
    },
  },
  top: {
    delete: "Удалить",
    create: "Создать",
    search: "Поиск",
    reload: "Перезагрузить",
    selectAll: "Выбор элементов",
    back: "Вернуться назад",
  },
  dialog: {
    edit: {
      dialogCaption: "Редактировать <strong>{{value}}</strong>",
      fieldCaption: "Заголовок",
      description: "Описание",
      save: "Сохранить",
      cancel: "Отмена",
      admin: "Администратор",
      login: "Логин",
      password: "Пароль",
      isAdmin: "Полный доступ",
      upload: "Выберите файл",
      uploadName: "Выбранный файл: <strong>{{value}}</strong>",
      delete: "Удалить файл",
      validate: {
        mustCharGreater: "Количество символов должно быть больше ${val}",
        mustCharLess: "Количество символов должно быть меньше ${val}",
      },
      tabs: {
        errorInput: "Есть незаполненные обязательные поля",
        doneInput: "Все требуемые поля заполнены",
        setting: "Общие параметры",
        stores: "Магазины",
        custom: "Фото",
      },
    },
    create: {
      dialogCaption: "Создать",
    },
    delete: {
      dialogCaption: "Удалить",
      cancel: "Отмена",
      ok: "Удалить",
      emptyData: "Удалить элемент",
    },
  },
  table: {
    loading: "Загрузка",
    count: "Выбрано элементов {{value}}",
    empty: "Список пуст",
  },
};

module.exports = (data, moduleName) => {
  data[moduleName] = root;
};
