const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "customs", deps: []
 * createTable() => "locales", deps: []
 * createTable() => "users", deps: []
 * createTable() => "media", deps: [users]
 * createTable() => "userRoles", deps: [users]
 *
 */

const info = {
  revision: 1,
  name: "init",
  created: "2023-12-29T18:53:11.154Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "customs",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        icon: { type: Sequelize.TEXT, field: "icon" },
        color: { type: Sequelize.TEXT, field: "color" },
        bgColor: { type: Sequelize.TEXT, field: "bgColor" },
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "locales",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        code: { type: Sequelize.TEXT, field: "code" },
        altName: { type: Sequelize.TEXT, field: "altName" },
        isShow: { type: Sequelize.BOOLEAN, field: "isShow" },
        isDefClient: { type: Sequelize.BOOLEAN, field: "isDefClient" },
        isDefSystem: { type: Sequelize.BOOLEAN, field: "isDefSystem" },
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        login: { type: Sequelize.TEXT, field: "login" },
        password: { type: Sequelize.TEXT, field: "password" },
        description: { type: Sequelize.TEXT, field: "description" },
        isAdmin: { type: Sequelize.BOOLEAN, field: "isAdmin" },
        isSuperAdmin: { type: Sequelize.BOOLEAN, field: "isSuperAdmin" },
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
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "media",
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
        fileId: { type: Sequelize.TEXT, field: "fileId" },
        name: { type: Sequelize.TEXT, field: "name" },
        size: { type: Sequelize.INTEGER, field: "size" },
        mimeType: { type: Sequelize.TEXT, field: "mimeType" },
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
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "userRoles",
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
        controller: { type: Sequelize.TEXT, field: "controller" },
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
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["customs", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["locales", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["media", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userRoles", { transaction }],
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
