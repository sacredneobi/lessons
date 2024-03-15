const { loaderModule } = require("@utils");
const path = require("path");

let defLang = {};

const { loaderFile } = loaderModule(
  `${__dirname}${path.sep}lang_def`,
  `${__dirname}${path.sep}lang_def`,
  "import_lang_def",
  (moduleName) => require(`./lang_def/${moduleName}`),
  false,
  (module, name) => {
    defLang[name] = module;
  }
);

console[typeof console.done === "function" ? "done" : "log"](
  "SYSTEM",
  `DEF LANG: ${loaderFile.join(", ")}`
);

module.exports = {
  defLang,
};
