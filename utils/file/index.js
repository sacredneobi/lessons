const fs = require("fs");
const path = require("path");

const readDir = (dirPath, cb) => {
  const elements = fs.readdirSync(dirPath, { withFileTypes: true });
  const listDir = elements.filter((item) => item.isDirectory());
  const listFiles = elements.filter((item) => !item.isDirectory());

  if (listFiles?.length > 0) {
    cb(
      dirPath,
      listFiles.map((item) => item.name)
    );
  }

  listDir.forEach((dir) => {
    readDir(dirPath + path.sep + dir.name, cb);
  });
};

const walkDir = (dirPath, cb) => {
  if (!dirPath || !(typeof cb === "function")) {
    return;
  }
  readDir(dirPath, cb);
};

module.exports = { walkDir };
