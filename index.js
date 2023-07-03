require("./config");
const express = require("express");
const controllers = require("./controller");

const app = express();

app.use(express.json());

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
