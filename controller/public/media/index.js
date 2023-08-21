const { checkVal, mediaPath } = require("@utils");
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const { media } = require("@models");

const get = async (req, res) => {
  const { fileId: fileIdProps } = req.query;

  const fileId = String(fileIdProps).split(".")?.[0];

  if (fs.existsSync(mediaPath + path.sep + fileId)) {
    const fileData = await media.findOne({
      where: { fileId: fileId },
    });

    if (fileData) {
      const header = {
        "Cache-control": "no-transform, public, max-age=3600",
        expires: "3h",
        "content-type": fileData.mimeType,
        "accept-ranges": "bytes",
        "content-length": fileData.size,
        "Content-Range": `bytes 0-*/${fileData.size}`,
      };

      const file = fs.createReadStream(mediaPath + path.sep + fileId);

      if (req.acceptsEncodings("br") === "br") {
        res.writeHead(200, { ...header, "Content-Encoding": "br" });
        file.pipe(zlib.createBrotliCompress()).pipe(res);
      } else if (req.acceptsEncodings("deflate") === "deflate") {
        res.writeHead(200, { ...header, "Content-Encoding": "deflate" });
        file.pipe(zlib.createDeflate()).pipe(res);
      } else if (req.acceptsEncodings("gzip") === "gzip") {
        res.writeHead(200, { ...header, "Content-Encoding": "gzip" });
        file.pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200, header);
        file.pipe(res);
      }

      return;
    }
    res.status(404).send(`${fileId}: not found`);
  } else {
    res.status(404).send(`${fileId}: not found`);
  }
};

module.exports = (router, moduleName) => {
  router.get("/", checkVal(["fileId"], "query"), get);
  return true;
};
