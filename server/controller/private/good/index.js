const { Op, DataTypes, HasMany } = require("sequelize");
const { good, media } = require("@models");
const {
  checkVal,
  parseLimit,
  defExclude,
  defLimit,
  defSearch,
  mediaMiddleware,
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
          ...defExclude(["userId", "goodId", "caption", "description", "size"]),
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
      order: ["id"],
    })
    .then((data) => {
      data.searchColumns = search.columns;
      return data;
    })
    .defAnswer(res);
};

const update = async (req, res) => {
  const { id, ...other } = req.body;

  for (const mediaData of req.body.media?.filter((item) => item.isDelete) ??
    []) {
    await media.destroy({ where: { id: mediaData.id } });
  }

  for (const file of req.newFiles) {
    file.goodId = id;
    await media.create(file);
  }

  good.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  good
    .create(req.body)
    .then(async (data) => {
      for (const file of req.newFiles) {
        file.goodId = data.id;
        await media.create(file);
      }
      return data;
    })
    .defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.body;
  good.destroy({ where: { id } }).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", parseLimit, get);
  router.get("/:id", getById);
  router.put("/", mediaMiddleware, checkVal(["id"], "body"), update);
  router.post("/", mediaMiddleware, post);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
