const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(isSuperAdmin) => "users"
 * addColumn(isAdmin) => "users"
 *
 */

const info = {
  revision: 8,
  name: "addedLevelUser",
  created: "2023-07-19T18:04:58.933Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "users",
      "isSuperAdmin",
      { type: Sequelize.BOOLEAN, field: "isSuperAdmin" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "users",
      "isAdmin",
      { type: Sequelize.BOOLEAN, field: "isAdmin" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["users", "isSuperAdmin", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["users", "isAdmin", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
