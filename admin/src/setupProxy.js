const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: "http://localhost:4002",
      logLevel: "debug",
    })
  );
  app.use(
    createProxyMiddleware("/test_ws", {
      target: "ws://localhost:4002",
      ws: true,
      logLevel: "debug",
    })
  );
};
