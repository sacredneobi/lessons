const fs = require("fs");
const main = require("./main.json");

process.setting = {
  db: {
    username: "postgres",
    password: "postgres",
    database: "swan",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  jwt: "mySecretJWT",
  ...main,
  title: `SACRED task v${main.version}`,
  version: main.version,
};

try {
  const data = fs.readFileSync("./setting.json");
  if (data) {
    const loadData = JSON.parse(data);
    process.setting = { ...process.setting, ...loadData };
  }
} catch (err) {
  console.error("SETTING", err);
}
