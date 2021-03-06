import { Sequelize, DataTypes } from "sequelize";
import PokemonModel from "../models/pokemon.js";
import UserModel from "../models/user.js";
import pokemons from "./mock_pokemon.js";
import bcrypt from "bcrypt";

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "x0ciz672t6fsot1s",
    "y62ttj668y1b8qnw",
    "cw67ybamlxupjqqq",
    {
      host: "clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
      dialect: "mysql",

      logging: true,
      port: 3306,
    }
  );
} else {
  sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    dialect: "mysql",

    logging: false,
  });
}

export const Pokemon = PokemonModel(sequelize, DataTypes);
export const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  sequelize
    //optional
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.log("error", error);
    });
  //create table:::
  return sequelize.sync({ force: false }).then((_) => {
    // sync({ force: true }) for dev only
    // pokemons.map((pokemon) => {
    //   Pokemon.create({
    //     name: pokemon.name,
    //     hp: pokemon.hp,
    //     cp: pokemon.cp,
    //     picture: pokemon.picture,
    //     types: pokemon.types,
    //   })
    //   .then((pokemon) => console.log(pokemon.toJSON()));
    // });

    // bcrypt
    //   .hash("ha123", 10)
    //   .then((hash) =>
    //     User.create({
    //       username: "billy",
    //       password: hash,
    //     })
    //   )
    // .then((user) => console.log(user.toJSON()));
    console.log("database initialiazed successfully !");
  });
};

export default { initDb, Pokemon, User };
