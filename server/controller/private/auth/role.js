const models = require("@models");
const { HasMany, HasOne, Op, col, fn, where } = require("sequelize");
const { adminRoot } = require("@root/access/def");
const { routerCheck } = require("@utils");

const model = models.userRole;

const getFlat = (arr, dest) => {
  for (const item of arr) {
    const { route, ...other } = item;
    dest.push(other);
    if (Array.isArray(route)) {
      getFlat(route, dest);
    }
  }
};

const eraseOperation = (arr) => {
  return arr.map((item) => {
    const { route, allowNullParam, ...other } = item;
    const data = { ...other };
    if (route) {
      data.route = eraseOperation(route);
    }
    return data;
  });
};

const findInRole = (name, roles) => {
  const find = roles.find((item) => item.name === name);
  if (find) {
    return find.operation;
  }
  return null;
};

const findComponentInRole = (item, roles) => {
  const find = roles.find((role) => role.name === item.name);
  if (find?.components && item.components) {
    return Object.keys(item.components).reduce((prev, itemKey) => {
      prev[itemKey] = {
        ...item.components[itemKey],
        show: find?.components?.[itemKey]?.show,
      };
      return prev;
    }, {});
    // return find.components;
  }
  return item.components;
};

const build = (arr, roles) => {
  return arr.map((item) => {
    const newData = {
      ...item,
      operation: findInRole(item.name, roles),
      components: findComponentInRole(item, roles),
    };

    if (item.route) {
      newData.route = build(item.route, roles);
    }

    return newData;
  });
};

const get = (req, res) => {
  const { userId } = req.query;

  model
    .findOne({ where: { userId } })
    .then((jsonData) => {
      if (jsonData) {
        const data = JSON.parse(jsonData.data);
        defThen(res, true)({ id: jsonData.id, rows: build(adminRoot, data) });
      } else {
        defThen(res, true)({ rows: eraseOperation(adminRoot) });
      }
    })
    .defCatch(res);
};
const post = (req, res) => {};
const put = async (req, res) => {
  const { access, userId, id } = req.body;

  let dest = [];

  getFlat(access, dest);

  dest = dest
    .map((item) => ({
      name: item.name,
      operation: item.operation,
      components: item.components,
    }))
    .filter((item) => item.operation || item.components);

  if (id) {
    model
      .update({ data: JSON.stringify(dest, null, 2) }, { where: { id } })
      .defRoute(res);
    return;
  }

  const find = await model.findOne({ where: { userId } });

  if (find) {
    model
      .update(
        { data: JSON.stringify(dest, null, 2) },
        { where: { id: find.id } }
      )
      .defRoute(res);
  } else {
    model.create({ data: JSON.stringify(dest, null, 2), userId }).defRoute(res);
  }
};

module.exports = (router) => {
  router.get("/", routerCheck(["userId"], "query"), get);
  router.post("/", post);
  router.put("/", routerCheck(["userId"]), put);
};
