const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    defParamCharset: "utf-8",
    // useTempFiles: true,
    // tempFileDir: "./temp_test",
  })
);

module.exports = { app };
