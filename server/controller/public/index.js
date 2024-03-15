const path = require("path");
const { loaderModule } = require("@utils");

const { controllers, loaderFile } = loaderModule(
  __dirname,
  path.basename(__filename),
  "import_controller_public",
  (fileName) => require(`./${fileName}`),
  true
);

console[typeof console.done === "function" ? "done" : "log"](
  "SYSTEM",
  `Controllers PUBLIC: ${loaderFile.join(", ")}`
);

module.exports = { path: "/api", controllers };
