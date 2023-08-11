const path = require("path");
const Sequelize = require("sequelize");
const config = require("../../config/config.json");
const { ErrorLoaderModule } = require("../../utils/class");
const { walkDir } = require("../../utils/file");

const db = {};

const basename = path.basename(__filename);

let sequelize;
sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    ...config.db,
    logging: null,
  }
);

const defOptions = { paranoid: true };
const defField = {
  caption: Sequelize.DataTypes.TEXT,
  description: Sequelize.DataTypes.TEXT,
};

let findFile = [];

function capitalizeFirstLetterWithoutIndex(string) {
  if (string === "index") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

walkDir(__dirname, (dir, files) => {
  files
    .filter((item) => {
      return (
        //Отфильтровываем файлы которые не удовлетворяют требования
        (item !== basename || dir.replace(__dirname, "") !== "") &&
        item.slice(-3) === ".js"
      );
    })
    .forEach((item) => {
      findFile.push(path.join(dir, item));
    });
});

const loaderFile = [];

findFile.forEach((item) => {
  const extension = path.extname(item);
  const file = path.basename(item, extension);

  const modelName =
    path.dirname(item.replace(__dirname + path.sep, "")) !== "."
      ? path
          .dirname(item.replace(__dirname + path.sep, ""))
          .split(path.sep)
          .map((item, index) =>
            index === 0 ? item : capitalizeFirstLetterWithoutIndex(item)
          )
          .join("") + capitalizeFirstLetterWithoutIndex(file)
      : file;

  const model = require(item);

  if (typeof model === "function") {
    const loadModel = model(sequelize, defOptions, modelName, defField);

    if (loadModel) {
      const name =
        modelName === loadModel.name
          ? modelName
          : `${modelName} (${loadModel.name})`;

      if (loaderFile.includes(name)) {
        throw new ErrorLoaderModule(`Error, module exist! ${name}`);
      }
      loaderFile.push(name);
      db[loadModel.name] = loadModel;
    }
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

if (typeof console.logUserDone === "function") {
  console.logUserDone("SYSTEM", `DB-models:\n ${loaderFile.join(", ")}`);
} else {
  console.log("SYSTEM", `DB-models:\n ${loaderFile.join(", ")}`);
}

module.exports = { ...db };
