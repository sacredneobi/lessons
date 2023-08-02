const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * renameColumn(mediumId) => "documents"
 *
 */

const info = {
  revision: 11,
  name: "fixedMediaField",
  created: "2023-08-02T17:47:29.177Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["documents", "mediumId", "mediaId"],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["documents", "mediaId", "mediumId"],
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
