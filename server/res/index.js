const loader = require("./loader");

let defLang = {};

const init = () => {
  loader({ path: `${__dirname}/lang_def`, type: "🧶Lang DEFAULT" }, defLang);
};

module.exports = {
  init,
  defLang,
};
