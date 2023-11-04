const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class ProductTag extends Model {};

// ProductTag entity definition for joining Product and Tag entities
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;