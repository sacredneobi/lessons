const { resolve, sep } = require("path");
const { locales: model } = require("@models");
const fs = require("fs");
const {
  defExclude,
  writeObj,
  recursion,
  routerCheck,
  langPath,
} = require("@utils");
const { defLang, defLangSystem } = require("../../../res");

const getData = (obj, name = "") => {
  let result = [];
  const keys = Object.keys(obj);
  keys.forEach((item) => {
    const newName = (name ? name + "." : "") + item;
    if (typeof obj[item] === "object") {
      getData(obj[item], newName).forEach((item) => {
        result.push(item);
      });
    } else {
      result.push({ name: newName, value: obj[item] });
    }
  });
  return result;
};

const get = (req, res) => {
  const { id, langId, limit, offset = 0, type, search } = req.query;

  if (id) {
    model.findOne({ ...defExclude(), where: { id } }).defAnswer(res);
    return;
  }

  if (langId) {
    model
      .findOne({ ...defExclude(), where: { id: langId } })
      .then((data) => {
        const fileName = `${langPath}${sep}${data?.code}${
          type === "2" ? "_system" : ""
        }.lng`;

        let readData = {};

        if (fs.existsSync(fileName)) {
          readData = fs.readFileSync(fileName, { encoding: "utf8" });
          try {
            readData = JSON.parse(readData);
          } catch (err) {
            console.log(err);
          }
        }
        let newData = getData(type === "2" ? defLangSystem : defLang);
        if (search) {
          newData = newData.filter((item) =>
            item.value.toUpperCase().includes(search.toUpperCase())
          );
        }
        const newReadData = getData(readData);
        return {
          count: newData.length,
          rows: newData
            .map((item, index) => ({ ...item, id: index }))
            .slice(parseInt(offset), parseInt(limit) + parseInt(offset))
            .map((item) => {
              return {
                ...item,
                newValue: newReadData.find(
                  (readItem) => readItem.name === item.name
                )?.value,
              };
            }),
        };
      })
      .defAnswer(res);
    return;
  }

  model
    .findAll({
      ...defExclude(),
      order: [["id", "desc"]],
    })
    .defAnswer(res);
};

const autoLoad = (req, res) => {
  const { lng } = req.params;

  const fileName = resolve(`./res/${lng}.lng`);

  new Promise((resolveData, reject) => {
    fs.access(fileName, (err) => {
      if (err) {
        resolveData(defLang);
      }
      fs.readFile(resolve(fileName), { encoding: "UTF8" }, (err, data) => {
        if (err) {
          resolveData(defLang);
        }
        try {
          const loadLang = JSON.parse(data);
          if (lng === "ru") {
            let answer = [];
            recursion(loadLang, answer);
            const newDefLang = JSON.parse(JSON.stringify(defLang));
            answer.forEach((item) => {
              if (item.value && item.value.trim() !== "") {
                writeObj(newDefLang, item.name, item.value);
              }
            });
            resolveData(newDefLang);
          } else {
            resolveData(loadLang);
          }
        } catch {
          resolveData(defLang);
        }
      });
    });
  }).defAnswer(res);
};

const post = (req, res) => {
  model
    .create(req.body)
    .dropAttributes(defExclude().attributes.exclude)
    .defAnswer(res);
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  model
    .update(other, { where: { id } })
    .then(() => ({ update: true }))
    .defAnswer(res);
};

const del = (req, res) => {
  model.destroy({ where: { id: req.body.id } }).defAnswer(res);
};

const postDef = (req, res) => {
  const { lng, name, newValue, type } = req.body;

  model
    .findOne({ where: { id: lng } })
    .then((data) => {
      if (data.code) {
        const fileName = `${langPath}${sep}${data?.code}${
          type === 2 ? "_system" : ""
        }.lng`;

        let readData = {};

        if (fs.existsSync(fileName)) {
          readData = fs.readFileSync(fileName, { encoding: "utf8" });
          try {
            readData = readData ? JSON.parse(readData) : {};
          } catch (err) {
            console.log(err);
          }
        }
        writeObj(readData, name, newValue);
        fs.writeFileSync(fileName, JSON.stringify(readData, null, 2));
      }
      return { ok: true };
    })
    .defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.get(`/:lng`, autoLoad);
  router.post("/", routerCheck(["caption", "code", "altName"], "body"), post);
  router.post(
    "/setByDefault",
    routerCheck(["id", "name", "type", "lng"], "body"),
    postDef
  );
  router.put(
    "/",
    routerCheck(["caption", "code", "altName", "id"], "body"),
    update
  );
  router.delete("/", routerCheck(["id"], "body"), del);

  return true;
};
