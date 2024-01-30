const Sequelize = require("sequelize");

const connection = new Sequelize("games", "root", "vini1208", {
  dialect: "sqlite",
  storage: "./database/app.db",
});

module.exports = connection;
