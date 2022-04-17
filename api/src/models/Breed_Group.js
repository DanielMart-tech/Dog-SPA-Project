const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "breed_group",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      breed: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
