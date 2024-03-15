const path = require("path");
const Sequelize = require("sequelize");
const { ErrorLoaderModule } = require("../../utils/class");
const { loaderModule } = require("../../utils/file");
require("../../config/setting");
const pg = require("pg");

const db = {};

let sequelize = process.setting?.db
  ? new Sequelize(
      process.setting.db.database,
      process.setting.db.username,
      process.setting.db.password,
      {
        ...process.setting.db,
        dialectModule: pg,
        logging: null,
      }
    )
  : null;

if (!sequelize) {
  console.error("MODEL", "setting empty");
  return;
}

const loaderFile = [];

loaderModule(
  __dirname,
  path.basename(__filename),
  "import_model",
  (fileName) => require(`./${fileName}`),
  false,
  (model, modelName) => {
    if (typeof model === "function") {
      const loadModel = model(sequelize, { paranoid: true }, modelName, {
        caption: Sequelize.DataTypes.TEXT,
        description: Sequelize.DataTypes.TEXT,
      });

      if (loadModel) {
        if (loaderFile.includes(modelName)) {
          throw new ErrorLoaderModule(`Error, module exist! ${modelName}`);
        }
        loaderFile.push(modelName);
        db[loadModel.name] = loadModel;
      }
    }
  }
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

console[typeof console.done === "function" ? "done" : "log"](
  "SYSTEM",
  `DB-models: ${loaderFile.join(", ")}`
);

module.exports = { ...db };
