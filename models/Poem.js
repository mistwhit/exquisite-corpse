const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Poem extends Model {}

Poem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_text: {
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
/*     fragment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fragment',
        key: 'id',
      },
    } */
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'poem',
  }
);

module.exports = Poem;
