const dispatch = (name, data) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: data,
  });
  document.dispatchEvent(event);
};

const addEvent = (name, event) => {
  const localEvent = ({ detail }) => {
    if (typeof event === "function") {
      event(detail);
    }
  };

  document.addEventListener(name, localEvent);
  return () => {
    document.removeEventListener(name, localEvent);
  };
};

export { dispatch, addEvent };
