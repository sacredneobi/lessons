const fs = require("fs");
const path = require("path");

const scriptsPath = path.resolve(`./scripts/`);
const langPath = path.resolve(`./res/`);
const mediaPath = path.resolve(`./media/`) + path.sep;

if (!fs.existsSync(scriptsPath)) {
  fs.mkdirSync(scriptsPath);
}
if (!fs.existsSync(langPath)) {
  fs.mkdirSync(langPath);
}
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
}

module.exports = {
  scriptsPath,
  langPath,
  mediaPath,
  ...require("./loader"),
};
