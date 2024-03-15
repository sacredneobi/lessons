const path = require("path");
const { loaderModule } = require("@utils");

const { controllers, loaderFile } = loaderModule(
  __dirname,
  path.basename(__filename),
  "import_controller_private",
  (fileName) => require(`./${fileName}`)
);

console[typeof console.done === "function" ? "done" : "log"](
  "SYSTEM",
  `Controllers PRIVATE: ${loaderFile.join(", ")}`
);

process.controllers = { private: loaderFile };

module.exports = { path: "/api/private", controllers };
