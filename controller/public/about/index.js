const get = async (req, res) => {

};

module.exports = (router, moduleName) => {
  router.get("/", get);
  return true;
};
