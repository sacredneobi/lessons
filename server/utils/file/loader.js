const path = require("path");
const { Router } = require("express");
const { routerCheck } = require("../express/routerCheck");
const fs = require("fs");

const readDir = (dir, cb) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  const dirRead = fs.readdirSync(dir, { withFileTypes: true });
  const newDir = dirRead.filter((item) => item.isDirectory());
  const newFile = dirRead.filter((item) => !item.isDirectory());

  cb(
    dir,
    newFile.map((item) => item.name)
  );

  newDir.forEach((item) => {
    readDir(dir + path.sep + item.name, cb);
  });
};

const fileWalk = (dir, cb) => {
  readDir(dir, cb);
};

const loaderModule = (
  beginDir,
  basename,
  fileName,
  onModule,
  check,
  onProcess
) => {
  let findFile = process.LOADER ? require(`./${fileName}.json`) : [];
  let controllers = [];

  function capitalizeFirstLetterWithoutIndex(string) {
    if (string === "index") {
      return "";
    }
    return string[0].toUpperCase() + string.slice(1);
  }

  fileWalk(beginDir, (dir, files) => {
    files
      .filter((item) => {
        return (
          //Отфильтровываем файлы которые не удовлетворяют требования
          (item !== basename || dir.replace(beginDir, "") !== "") &&
          item.slice(-3) === ".js"
        );
      })
      .forEach((item) => {
        // console.log(dir, beginDir, item);
        findFile.push(
          path
            .join(
              dir.replace(beginDir + path.sep, "").replace(beginDir, ""),
              item
            )
            .replaceAll("\\", "/")
        );
      });
  });

  !process.LOADER &&
    fs.writeFileSync(
      `${__dirname}/${fileName}.json`,
      JSON.stringify(findFile, null, 2)
    );

  const loaderFile = [];

  findFile.forEach((item) => {
    const extension = path.extname(item);
    const file = path.basename(item, extension);

    const modelName =
      path.dirname(item.replace(beginDir + path.sep, "")) !== "."
        ? path
            .dirname(item.replace(beginDir + path.sep, ""))
            .split(path.sep)
            .map((item, index) =>
              index === 0 ? item : capitalizeFirstLetterWithoutIndex(item)
            )
            .join("") + capitalizeFirstLetterWithoutIndex(file)
        : file;

    const model = onModule?.(item);

    if (typeof onProcess === "function") {
      onProcess(model, modelName);
      loaderFile.push(modelName);
    } else {
      if (typeof model === "function") {
        const router = Router();

        const loadModel = model(router, modelName);

        if (loadModel) {
          if (check && typeof routerCheck === "function") {
            const checkResult = routerCheck(router, ["put", "post", "delete"]);
            if (checkResult.length > 0) {
              console.log(
                `❌ in router \x1b[33m"${modelName.toUpperCase()}"\x1b[0m found dangerous method: \x1b[31m"${checkResult.join(
                  ", "
                )}"\x1b[0m`
              );
            }
          }

          loaderFile.push(modelName);
          controllers.push({ name: `/${modelName}`, router });
        }
      }
    }
  });

  return { controllers, loaderFile };
};

module.exports = { loaderModule };
