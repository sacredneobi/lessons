require("module-alias/register");
const { app } = require("./config");
require("./events");
const initLoad = require("./controller");
const wsServer = require("./wsServer");

if (typeof wsServer === "function") {
  wsServer(app);
}

if (typeof initLoad === "function") {
  initLoad(app);
}

app.listen(8989, () => {
  console.log("server listen on port: 8989");
});

//---------------- ТЕСТОВО ДЛЯ СОЗДАНИЯ ЗАПИСИ

// const { userRole, media } = require("@models");

// media.findAll().then((data) => {
//   console.log(data.map((item) => item.toJSON()));
// });

// userRole.create({ caption: "auto create", controller: "document", userId: 1 });
