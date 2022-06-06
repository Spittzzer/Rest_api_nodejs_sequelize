import express from "express";

import bodyParser from "body-parser";
// import morgan from "morgan";
import sequelize from "./src/db/sequelize.js";
import { ValidationError } from "sequelize";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import privateKey from "./src/auth/privateKey.js";
import auth from "./src/auth/auth.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

sequelize.initDb();

//api endpoints
//sequelize find all
app.get("/api/pokemons", auth, (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    const limit = parseInt(req.query.limit) || 5;
    return sequelize.Pokemon.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit: limit,
      order: [["name", "ASC"]], //sqlize orders by asc by default so we could do without "ASC"
    }).then(({ count, rows }) => {
      const message = `number of pokemons found: ${count}`;
      res.status(200).json({ message, data: rows });
    });
  }
  sequelize.Pokemon.findAll()
    .then((pokemons) => {
      res.json(pokemons);
    })
    .catch((err) => {
      const message = "error while getting all pokemons";
      res.status(500).json({ message, data: err });
    });
});
//find one
app.get("/api/pokemons/:id", auth, (req, res) => {
  //   console.log(req.params);
  const id = parseInt(req.params.id);
  sequelize.Pokemon.findOne({
    where: {
      id: id,
    },
  })
    .then((pokemon) => {
      if (pokemon === null) {
        res.status(404).json({ message: "pokemon not found" });
      }
      const message = "pokemon found";

      res.json({ message, data: pokemon });
    })
    .catch((err) => {
      const message = "error while getting pokemon";
      res.status(500).json({ message, data: err });
    });
});
//create one
app.post("/api/pokemons", auth, (req, res) => {
  const pokemonCreated = { ...req.body };
  sequelize.Pokemon.create(pokemonCreated)
    .then((newpokemons) => {
      res.json(newpokemons);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message, data: err });
      }
      const message = "error while creating pokemon";
      res.status(500).json({ message, data: err });
    });
});
//update one
app.put("/api/pokemons/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body };
  sequelize.Pokemon.update(pokemonUpdated, {
    where: {
      id: id,
    },
  })
    .then(() => {
      return sequelize.Pokemon.findOne({
        where: {
          id: id,
        },
      }).then((pokemon) => {
        if (pokemon === null) {
          res.status(404).json({ message: "pokemon not found" });
        }
        res.json(pokemon);
      });
    })
    .catch((err) => {
      const message = "error while creating pokemon";
      res.status(500).json({ message, data: err });
    });
});
// delete one
app.delete("/api/pokemons/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);
  sequelize.Pokemon.destroy({
    where: {
      id: id,
    },
  })
    .then((pokemon) => {
      if (pokemon === null) {
        res.status(404).json({ message: "pokemon not found" });
      }
      res.json({
        message: "Pokemon deleted",
      });
    })
    .catch((err) => {
      const message = "error while deleting pokemon";
      res.status(500).json({ message, data: err });
    });
});

app.get("/", (req, res) => res.send("Sup y'all it's meee billyyy"));

//login routes
app.post("/api/login", (req, res) => {
  sequelize.User.findOne({
    where: { username: req.body.username || null },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          //JSON web Token:
          const token = jwt.sign({ id: user.id }, privateKey, {
            expiresIn: "1h",
          });

          if (isPasswordValid) {
            res.json({ message: "login successful", data: user, token });
          } else {
            res.json({ message: "wrong password " });
          }
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "error while logging in", data: err });
    });
});
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU0NTAzODI3LCJleHAiOjE2NTQ1MDc0Mjd9.ettwxg_IV7RPq-Z977Gmas0uieja1qzHDJgtZYDgEz0"
//404 handling
app.use((req, res, next) => {
  const err = "Not Found heh";
  res.status(404).json(err);
});

app.listen(port, () =>
  console.log(`node application running on: http://localhost:${port}`)
);
