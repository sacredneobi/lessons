const { dispatchAlert } = require("./event");

const copyText = (data) => {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      dispatchAlert({
        caption: `Copy to clipboard\n\n${data}`,
      });
    })
    .catch((err) => {
      dispatchAlert({ caption: err.message, variant: "error" });
    });
};

export { copyText };
