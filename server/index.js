require("module-alias/register");
require("./events");
const { app } = require("./config");
require("./res").init();
const initLoad = require("./controller");
const wsServer = require("./wsServer");

if (typeof wsServer === "function") {
  wsServer(app);
}

if (typeof initLoad === "function") {
  initLoad(app);
}

app.listen(process.setting.port, () => {
  console.log(`server listen on port: ${process.setting.port}`);
});

console.log("dddd");
