const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fragment extends Model {}

Fragment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text_input: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    poem_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'poem',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fragment',
  }
);

module.exports = Fragment;
