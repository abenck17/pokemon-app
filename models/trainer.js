'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trainer.belongsTo(models.Team, { foreignKey: 'teamId' })
      Trainer.hasMany(models.Pokemon, { 
        // through: 'PlayerPokemon',
        foreignKey: 'playerId',
        // otherKey: 'pokemonId'
      });
  };
}
  Trainer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};