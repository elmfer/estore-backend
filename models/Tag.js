const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Tag extends Model {};

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    modelName: 'tag'
  }
);

module.exports = Tag;