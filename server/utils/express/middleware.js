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

module.exports = { checkVal, parseLimit };
