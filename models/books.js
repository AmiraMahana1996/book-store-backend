const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    auther: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    img_cover: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__books__3213E83FF9A1C455",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
