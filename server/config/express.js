const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    defParamCharset: "utf-8",
  })
);
app.use((req, res, next) => {
  res.setHeader("X-Server", process.setting.version);
  next();
});

module.exports = { app };
