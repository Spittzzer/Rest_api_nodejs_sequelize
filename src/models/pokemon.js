const validTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];
const Pokemon = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
          notEmpty: { msg: "no empty name" },
          notNull: { msg: "name is required" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "hp must be an number" },
          notNull: { msg: "hp is required" },
          min: { args: [0], msg: "hp must be greater than 0" },
          max: { args: [999], msg: "hp must be less than 999" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "cp must be an number" },
          notNull: { msg: "cp is required" },
          min: { args: [0], msg: "hp must be greater than 0" },
          max: { args: [99], msg: "hp must be less than 99" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: { msg: "picture must be a URL" },
          notNull: { msg: "picture is required" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            const types = value.split(",");
            if (types.length > 3) {
              throw new Error("max 3 types");
            }
            if (types.length < 1) {
              throw new Error("min 1 type");
            }
            validTypes.forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error("type is not valid");
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
export default Pokemon;
