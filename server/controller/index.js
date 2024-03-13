const { Router } = require("express");
const private_2 = require("./private");
const public_2 = require("./public");

const initRouter = (webServer, routers) => {
  if (!webServer || !Array.isArray(routers?.controllers) || !routers?.path) {
    if (!Array.isArray(routers?.controllers) || !routers?.path) {
      console.log(`controllers ${routers?.path} not correct`);
      return;
    }
    console.log("web server is not defined");
    return;
  }

  const router = new Router();
  routers.controllers.forEach((item) => {
    if (item.name && item.router) {
      router.use(item.name, item.router);
    }
  });
  webServer.use(routers.path, router);
};

const initLoad = (webServer) => {
  initRouter(webServer, private_2);
  initRouter(webServer, public_2);
};

module.exports = initLoad;
