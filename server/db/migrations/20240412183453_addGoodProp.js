const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(article) => "goods"
 * createTable() => "goodProps", deps: [goods]
 * addColumn(otherId) => "goods"
 *
 */

const info = {
  revision: 4,
  name: "addGoodProp",
  created: "2024-04-12T18:34:53.572Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["goods", "article", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "goodProps",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        article: { type: Sequelize.TEXT, field: "article" },
        color: { type: Sequelize.TEXT, field: "color" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
        goodId: {
          type: Sequelize.INTEGER,
          field: "goodId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "goods", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "otherId",
      { type: Sequelize.TEXT, field: "otherId" },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["goods", "otherId", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["goodProps", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "goods",
      "article",
      { type: Sequelize.TEXT, field: "article" },
      { transaction },
    ],
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
