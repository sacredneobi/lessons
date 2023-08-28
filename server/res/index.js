const loader = require("./loader");

let defLang = {};
let defLangSystem = {};

const init = () => {
  loader({ path: `${__dirname}/lang_def`, type: "🧶Lang DEFAULT" }, defLang);
  loader(
    { path: `${__dirname}/lang_def_system`, type: "🧶Lang DEFAULT SYSTEM" },
    defLangSystem
  );
};

module.exports = {
  init,
  defLang,
  defLangSystem,
};
