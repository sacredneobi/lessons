const { Op, HasOne } = require("sequelize");
const { user: model, media } = require("@models");
const {
  checkVal,
  defExclude,
  buildLimit,
  mediaPath,
  defDelete,
} = require("@utils");

const getById = (req, res) => {
  const { id } = req.params;
  model
    .findOne({ attributes: ["caption", "id"], where: { id } })
    .defAnswer(res);
};

const get = (req, res) => {
  const { id, search, limit, offset } = req.query;

  if (id) {
    model
      .findOne({
        ...defExclude(["password"]),
        include: [
          {
            association: new HasOne(model, media, {
              sourceKey: "id",
              foreignKey: "userId",
              as: "media",
            }),
            ...defExclude(),
          },
        ],
        where: { id },
      })
      .defAnswer(res);
    return;
  }

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;

  model
    .findAndCountAll({
      ...buildLimit(limit, offset, ["password"]),
      include: [
        {
          association: new HasOne(model, media, {
            sourceKey: "id",
            foreignKey: "userId",
            as: "media",
          }),
          ...defExclude(),
        },
      ],
      where,
      order: ["id"],
    })
    .defAnswer(res);
};

const post = (req, res) => {
  const { ...other } = req.body;
  model
    .create(other)
    .then(async (data) => {
      if (req.files) {
        for (const inputFile of Object.keys(req.files)) {
          const file = req.files[inputFile];
          file.mv(mediaPath + "/" + file.md5);
          await media.create({
            fileId: file.md5,
            mimeType: file.mimetype,
            name: file.name,
            size: file.size,
            userId: data.id,
          });
          break;
        }
      }
    })
    .defAnswer(res);
};

const update = async (req, res) => {
  const { id, removeMedia, ...other } = req.body;
  if (req.files) {
    for (const inputFile of Object.keys(req.files)) {
      const file = req.files[inputFile];
      file.mv(mediaPath + "/" + file.md5);
      let find = await media.findOne({ where: { userId: id } });
      if (find) {
        await media.update(
          {
            fileId: file.md5,
            mimeType: file.mimetype,
            name: file.name,
            size: file.size,
          },
          { where: { id: find?.id } }
        );
      } else {
        await media.create({
          fileId: file.md5,
          mimeType: file.mimetype,
          name: file.name,
          size: file.size,
          userId: id,
        });
      }
      break;
    }
  }
  if (removeMedia) {
    await media.destroy({ where: { userId: id } });
  }
  model.update(other, { where: { id } }).defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
  router.post("/", post);
  router.put("/", checkVal(["id"], "body"), update);
  router.delete("/", ...defDelete(model));

  return !!model;
};
