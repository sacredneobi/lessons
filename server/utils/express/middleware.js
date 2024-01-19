const { mediaPath } = require("../file");
const { ErrorMiddleWare } = require("../class");

const checkVal = (fields, place) => {
  if (!Array.isArray(fields)) {
    throw new ErrorMiddleWare("Fields is not array");
  }

  return (req, res, next) => {
    const checkData = req[place] ? req[place] : {};

    const checkArr = fields.filter((item) => !checkData[item]);

    if (checkArr.length > 0) {
      res.status(500).send({
        error: true,
        message: `Not found "${checkArr.join(", ")}" in request. "${place}"`,
      });
      return;
    }
    next();
  };
};

const parseLimit = (req, res, next) => {
  const { limit, offset } = req.query ?? {};
  if (req.query) {
    req.query.limit = parseInt(limit);
    req.query.offset = parseInt(offset);
  }
  next();
};

const mediaMiddleware = async (req, res, next) => {
  if (typeof req.body?.data === "string") {
    try {
      req.body = JSON.parse(req.body?.data);
    } catch (err) {
      console.log(err);
    }
  }

  req.newFiles = [];

  if (req.files && Object.keys(req.files).length > 0) {
    for (const key in req.files) {
      const item = req.files[key];

      const fileName = mediaPath + item.md5;

      try {
        await item.mv(fileName);

        req.newFiles.push({
          fileId: item.md5,
          name: item.name,
          size: item.size,
          mimeType: item.mimetype,
          fileName,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  next();
};

module.exports = { checkVal, parseLimit, mediaMiddleware };
