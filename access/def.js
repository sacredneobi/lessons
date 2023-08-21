const adminRoot = [
  {
    name: "service",
    isSetting: true,
    route: [{ name: "translate" }, { name: "task", withOutOperation: true }],
  },
  {
    name: "users",
    isSetting: true,
    route: [{ name: "settings" }, { name: "role/:id", withOutOperation: true }],
  },
];

module.exports = { adminRoot };
