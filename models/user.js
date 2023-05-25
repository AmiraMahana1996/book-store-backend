const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      fname: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      lname: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PK__users__3213E83FDFCEF1D0",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
