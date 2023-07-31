const { Op } = require("sequelize");
const { user, media } = require("@models");
const { checkVal, getMediaPath } = require("@utils");

const getURI = (req, res) => {
  const { id } = req.params;
  user.findOne({ where: { id } }).defAnswer(res);
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  user
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .defAnswer(res);
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  user.update(other, { where: { id } }).defAnswer(res);
};

const post = async (req, res) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    const item = req.files[file];

    await media.create({
      name: item.name,
      size: item.size,
      mimeType: item.mimetype,
      fileId: item.md5,
    });

    item.mv(`${getMediaPath()}${item.md5}`);
  }

  res.status(500).send("d");
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);
  router.put("/", checkVal(["id"], "body"), update);
  router.post("/", post);

  return true;
};
