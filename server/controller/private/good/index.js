const { Op, DataTypes, HasMany } = require("sequelize");
const { good, media } = require("@models");
const {
  checkVal,
  parseLimit,
  defExclude,
  defLimit,
  defSearch,
  mediaPath,
  defAnswerError,
} = require("@utils");

const getById = (req, res) => {
  const { id } = req.params;
  good
    .findOne({
      ...defExclude(),
      include: [
        {
          association: new HasMany(good, media, {
            sourceKey: "id",
            foreignKey: "goodId",
          }),
          ...defExclude(["userId", "goodId", "caption", "description"]),
        },
      ],
      where: { id },
    })
    .defAnswer(res);
};

const get = (req, res) => {
  const search = defSearch(good, req.query);

  good
    .findAndCountAll({
      ...defExclude(),
      ...defLimit(req.query),
      where: search.where,
    })
    .then((data) => {
      data.searchColumns = search.columns;
      return data;
    })
    .defAnswer(res);
};

const update = async (req, res) => {
  const { id, ...other } = req.body;

  for (const file of req.newFiles) {
    file.goodId = id;
    // await media.destroy({ where: { goodId: id } });
    await media.create(file);
  }

  good.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  good.create(req.body).defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.body;
  good.destroy({ where: { id } }).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", parseLimit, get);
  router.get("/:id", getById);
  router.put(
    "/",
    async (req, res, next) => {
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
    },
    checkVal(["id"], "body"),
    update
  );
  router.post("/", post);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
