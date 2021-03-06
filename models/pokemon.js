'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pokemon.belongsTo(models.Trainer, {
        // through: 'PlayerPokemon',
        // foreignKey: 'pokemonId',
        foreignKey: 'playerId'
      });
  };
  };
  Pokemon.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING, 
    playerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};