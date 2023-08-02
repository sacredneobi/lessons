require("module-alias/register");
require("./config");
require("./events");
const express = require("express");
const controllers = require("./controller");
const wsServer = require("./wsServer");
const { userRole, media } = require("@models");
const fileUpload = require("express-fileupload");

const timer = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 5000);
  });
};

process.myEvents?.on("new order", async (_, getHeaders, answer) => {
  await timer();
  if (typeof getHeaders === "function") {
    const headers = getHeaders();
    console.log(headers);
    answer({ user: headers.authorization });
  }
  console.log("OK new order");
});

process.myEvents?.on("webSocketData", (props) => {
  const { data, send } = props;
  send("pong : " + data);
});

process.myEvents?.on("webSocketData", (props) => {
  const { data, send } = props;
  send("new listener pong : " + data);
});

const app = express();

if (typeof wsServer === "function") {
  wsServer(app);
}

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    defParamCharset: "utf-8",
    // useTempFiles: true,
    // tempFileDir: "./temp_test",
  })
);

if (Array.isArray(controllers.private)) {
  controllers.private.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
} else {
  console.log("controllers private not correct");
}

if (Array.isArray(controllers.public)) {
  controllers.public.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}

app.listen(8989, () => {
  console.log("server listen on port: 8989");
});

// media.findAll().then((data) => {
//   console.log(data.map((item) => item.toJSON()));
// });

// userRole.create({ caption: "auto create", controller: "document", userId: 1 });
