const dispatch = (name, data, obj = document) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: data,
  });
  obj.dispatchEvent(event);
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

export { dispatch, addEvent };
