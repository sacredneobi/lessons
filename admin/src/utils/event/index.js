const dispatch = (name, data, obj = document) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: data,
  });
  obj.dispatchEvent(event);
};

const dispatchEdit = (langBase, data, obj = document) => {
  dispatch(`${langBase}.dialog.edit`, data, obj);
};

const dispatchDelete = (langBase, data, obj = document) => {
  dispatch(`${langBase}.dialog.delete`, data, obj);
};

const dispatchAlert = (data) => {
  dispatch("notification", data);
};

const addEvent = (name, event, obj = document, ...args) => {
  const localEvent = ({ detail }) => {
    if (typeof event === "function") {
      event(detail);
    }
  };

  obj.addEventListener(name, localEvent, ...args);
  return () => {
    obj.removeEventListener(name, localEvent);
  };
};

export { dispatch, dispatchEdit, dispatchDelete, addEvent, dispatchAlert };
