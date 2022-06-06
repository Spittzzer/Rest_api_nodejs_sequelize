const User = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: { message: "username already exists" },
    },
    password: {
      type: DataTypes.STRING,
    },
  });
};
export default User;
