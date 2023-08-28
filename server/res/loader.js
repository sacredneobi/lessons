const { fileWalk } = require("@utils");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const getErrorMessage = (fileName, message) => {
  console.log(`Error load "${fileName}": ${message}`);
};

const check = (options) => {
  if (!options && options !== "object" && !options.path) {
    return false;
  }

  if (options.exclude && !Array.isArray(options.exclude)) {
    return false;
  }
  return true;
};

module.exports = (options, data, getData) => {
  if (!check(options)) return;

  if (!fs.existsSync(options.path)) return;

  const newPath = options.path.replace("/", path.sep).replace("\\", path.sep);

  let findFile = [];

  function capitalizeFirstLetter(string) {
    if (string === "index") {
      return "";
    }
    return string[0].toUpperCase() + string.slice(1);
  }

  fileWalk(newPath, (dir, files) => {
    findFile = [
      ...findFile,
      ...files
        .filter((item) => {
          return (
            (item !== basename || dir.replace(newPath, "") !== "") &&
            item.slice(-3) === ".js"
          );
        })
        .map((item) => path.join(dir, item)),
    ];
  });

  const loaderFile = [];

  // console.log(JSON.stringify(findFile, null, 2));

  findFile.forEach((item) => {
    const extension = path.extname(item);
    const file = path.basename(item, extension);
    const moduleName =
      path.dirname(item.replace(newPath + path.sep, "")) !== "."
        ? path
            .dirname(item.replace(newPath + path.sep, ""))
            .split(path.sep)
            .map((item, index) =>
              index === 0 ? item : capitalizeFirstLetter(item)
            )
            .join("") + capitalizeFirstLetter(file)
        : file;

    try {
      const module = require(item);
      if (typeof module === "function") {
        if (typeof getData === "function") {
          module(getData(moduleName), moduleName, data);
        } else {
          module(data, moduleName);
        }
        loaderFile.push(moduleName);
      } else {
        getErrorMessage(
          `${options.type}.${moduleName}`,
          "Error load module export is not function"
        );
      }
    } catch (error) {
      console.log(error);
      getErrorMessage(moduleName, error.message);
    }
  });

  console.done(
    "SYSTEM",
    `${options.type ? options.type : "module"}:\n ${loaderFile.join(", ")}`
  );
};
