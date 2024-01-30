const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");
const Game = require("./database/Game");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.get("/games", (req, res) => {
  Game.findAll({ raw: true, order: [["id", "ASC"]] }).then((game) => {
    res.json(game);
  }).catch((err) => {
    res.sendStatus(400);
  })
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body;

  Game.create({
    title: title,
    price: price,
    year: year,
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(400);
  })
});

app.get("/game/:id", (req, res) => {
  var id = req.params.id;

  Game.findOne({
    where: { id: id },
  })
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.delete("/game/:id", (req, res) => {
  var id = req.params.id;
  Game.destroy({ where: { id: id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.put("/game/:id", (req, res) => {
  var id = req.params.id;

  const atual = Game.findOne({ where: { id: id } });

  var { title, price, year } = req.body;

  if (title == null) {
    title = atual.title;
  }

  if (price == null) {
    price = atual.price;
  }

  if (year == null) {
    year = atual.year;
  }

  Game.update({ title: title, price: price, year: year }, { where: { id: id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.listen(4000, () => {
  console.log("API RODANDO");
});
