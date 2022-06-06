// import express from "express";
// import bodyParser from "body-parser";
// import { success, getUniqueId } from "./helpers.js";
// import pokemons from "./src/db/mock_pokemon.js";
// import morgan from "morgan";
// import { Sequelize, DataTypes } from "sequelize";
// import PokemonModel from "./src/models/pokemon.js";
// import {sequelize,initDb} from "./src/db/sequelize.js";

// const app = express();
// const port = 3000;

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

// const Pokemon = PokemonModel(sequelize, DataTypes);
// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");

//   pokemons.map((pokemon) => {
//     Pokemon.create({
//       name: pokemon.name,
//       hp: pokemon.hp,
//       cp: pokemon.cp,
//       picture: pokemon.picture,
//       types: pokemon.types.join(),
//     }).then((newpokemonss) => console.log(newpokemonss.toJSON()));
//   });
// });

// app.use(morgan("dev")).use(bodyParser.json());

// app.get("/", (req, res) => res.send("Hello, Express!"));

// app.get("/api/pokemons", (req, res) => {
//   const message = "La liste des pokémons a bien été récupérée.";
//   res.json(success(message, pokemons));
// });

// app.get("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemon = pokemons.find((pokemon) => pokemon.id === id);
//   const message = "Un pokémon a bien été trouvé.";
//   res.json(success(message, pokemon));
// });

// app.post("/api/pokemons", (req, res) => {
//   const id = 123335;
//   const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
//   pokemons.push(pokemonCreated);
//   console.log(pokemons);
//   const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
//   res.json(success(message, pokemonCreated));
// });

// app.put("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated = { ...req.body, id: id };
//   pokemons = pokemons.map((pokemon) => {
//     return pokemon.id === id ? pokemonUpdated : pokemon;
//   });

//   const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
//   res.json(success(message, pokemonUpdated));
// });

// app.delete("/api/pokemons/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
//   pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
//   const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
//   res.json(success(message, pokemonDeleted));
// });

// app.listen(port, () =>
//   console.log(
//     `Notre application Node est démarrée sur : http://localhost:${port}`
//   )
// );
