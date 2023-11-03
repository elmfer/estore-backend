const dbConnection = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Category extends Model {};

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'category'
  }
)

module.exports = Category;