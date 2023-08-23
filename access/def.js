const adminRoot = [
  {
    name: "service",
    isSetting: true,
    route: [{ name: "translate" }, { name: "scripts" }],
  },
  {
    name: "users",
    isSetting: true,
    route: [{ name: "settings" }, { name: "role/:id" }],
  },
];

module.exports = { adminRoot };
