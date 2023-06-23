const path = require("path");
const file = require("file");
const { Router } = require("express");

const basename = path.basename(__filename);

let findFile = [];
let controllers = [];

function capitalizeFirstLetterWithoutIndex(string) {
  if (string === "index") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

file.walkSync(__dirname, (dir, dirs, files) => {
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
    const router = Router();

    const loadModel = model(router, modelName);

    if (loadModel) {
      loaderFile.push(modelName);
      controllers.push({ name: `/${modelName}`, router });
    }
  }
});

if (typeof console.logUserDone === "function") {
  console.logUserDone("SYSTEM", `Controllers:\n ${loaderFile.join(", ")}`);
} else {
  console.log("SYSTEM", `Controllers:\n ${loaderFile.join(", ")}`);
}

module.exports = controllers;
