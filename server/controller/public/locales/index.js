const { defAnswer } = require("@utils");
const { defLang } = require("../../../res");

const resLang = {};

const get = (req, res) => {
  const { lng } = req.params;

  defAnswer(res)(lng === "en" ? defLang : resLang[lng]);
};

module.exports = (router, moduleName) => {
  router.get("/:lng", get);

  return true;
};
