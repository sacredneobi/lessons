const models = require("@models");
const { adminRoot } = require("@root/access/def");
const { defAnswer } = require("@utils");

const findInRole = (name, roles) => {
  const find = roles.find((item) => item.name === name);
  if (find) {
    return find.operation;
  }
  return null;
};

const findComponentsInRole = (name, roles) => {
  const find = roles.find((item) => item.name === name);
  if (find?.components) {
    return Object.keys(find.components)
      .filter((item) => find.components[item].show)
      .reduce((prev, item) => {
        if (!prev) {
          prev = {};
        }
        prev[item] = find.components[item].show;
        return prev;
      }, null);
  }
  return null;
};

const build = (arr, roles) => {
  // console.log(roles);
  return arr
    .map((item) => {
      // console.log(item);
      const findOperation = findInRole(item.name, roles);
      const findComponent = findComponentsInRole(item.name, roles);

      if ((findOperation && findOperation.show) || findComponent) {
        // console.log(findComponent);
        const newData = {
          ...item,
          operation: findOperation,
          components: findComponent,
        };

        if (item.route) {
          const filter = build(item.route, roles)?.filter((item) => item);
          if (filter && filter.length > 0) {
            newData.route = filter;
          } else {
            newData.route = null;
          }
        }

        return newData;
      }
      return null;
    })
    .filter((item) => item);
};

const get = async (req, res) => {
  let access = adminRoot;

  let isAdmin = req.userData?.isAdmin;
  let caption = req.userData?.caption;

  if (!req.userData?.isAdmin) {
    const findAdmin = await models.user.findAll({ where: { isAdmin: true } });
    if (findAdmin.length > 0) {
      const setting = await models.userRole.findOne({
        where: { userId: req.userData.id },
      });
      try {
        const data = JSON.parse(setting.data);
        access = build(adminRoot, data);
      } catch (err) {
        console.log(err);
        access = [];
      }
    } else {
      isAdmin = true;
      caption = null;
    }
  }

  const defData = {
    route: access,
    user: {
      id: req.userData?.id,
      description: req.userData?.description,
      caption,
      isAdmin: isAdmin || req.userData?.isSuperAdmin,
      media: req.userData?.media,
      title: process.setting.title,
      version: process.setting.version,
    },
  };

  if (process.setting.isDemo) {
    defData.isDemo = process.setting.isDemo;
  }

  defAnswer(res)(defData);
};

module.exports = (router) => {
  router.get("/", get);
  return true;
};
