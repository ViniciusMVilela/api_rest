const Sequelize = require("sequelize");
const connection = require("./db");

const Game = connection.define("jogo", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Game.sync({ force: false }).then(() => {});

module.exports = Game;
