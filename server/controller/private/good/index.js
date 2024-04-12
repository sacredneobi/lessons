const { Op, DataTypes, HasMany, HasOne } = require("sequelize");
const { good, media, goodProp } = require("@models");
const {
  checkVal,
  parseLimit,
  defExclude,
  defLimit,
  defSearch,
  mediaMiddleware,
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
        {
          association: new HasOne(good, goodProp, {
            sourceKey: "id",
            foreignKey: "goodId",
          }),
          attributes: ["article", "color"],
        },
      ],
      where: { id },
    })
    .then((data) => {
      const { goodProp, ...other } = data?.toJSON?.() ?? {};

      other.article = goodProp?.article;
      other.color = goodProp?.color;

      return other;
    })
    .defAnswer(res);
};

const get = (req, res) => {
  const search = defSearch(good, req.query);

  good
    .findAndCountAll({
      ...defExclude(),
      ...defLimit(req.query),
      include: [
        {
          association: new HasOne(good, goodProp, {
            sourceKey: "id",
            foreignKey: "goodId",
          }),
          attributes: ["article", "color"],
        },
      ],
      where: search.where,
      order: ["id"],
    })
    .then((data) => {
      data.searchColumns = search.columns;
      data.rows = data.rows.map((item) => {
        const { goodProp, ...other } = item.toJSON();

        other.article = goodProp?.article;
        other.color = goodProp?.color;

        return other;
      });
      return data;
    })
    .defAnswer(res);
};

const update = async (req, res) => {
  const { id, article, color, ...other } = req.body;

  const items =
    req.body.media
      ?.filter?.((item) => item.isDelete)
      ?.map?.(() => media.destroy({ where: { id: mediaData.id } })) ?? [];
  items.push(
    ...(req?.newFiles?.map?.((file) => media.create({ ...file, goodId: id })) ??
      [])
  );

  items.push(goodProp.update({ article, color }, { where: { goodId: id } }));

  await Promise.all(items);
  good.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  const { article, color, ...other } = req.body;

  good
    .create(other)
    .then(async (data) => {
      const items =
        req?.newFiles?.map?.((file) =>
          media.create({ ...file, goodId: data.id })
        ) ?? [];

      items.push(goodProp.create({ article, color, goodId: data?.id }));

      await Promise.all(items);

      return data;
    })
    .defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.body;
  good
    .destroy({ where: { id } })
    .then(async () => {
      await goodProp.destroy({ where: { goodId: id } });
      return { ok: true };
    })
    .defAnswer(res);
};

module.exports = (router) => {
  router.get("/", parseLimit, get);
  router.get("/:id", getById);
  router.put("/", mediaMiddleware, checkVal(["id"], "body"), update);
  router.post("/", mediaMiddleware, post);
  router.delete("/", checkVal(["id"], "body"), del);

  return true;
};
