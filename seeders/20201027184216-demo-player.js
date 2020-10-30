"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Trainers",
      [
        {
          name:'Ash Ketchum',
          username: 'pikapika',
          password: 'pikachurocks', 
          teamId: 1,
      },
      {
        name:'James',
        username: 'teamrocketjames',
        password: 'blastingoff',
        teamId: 2,
    },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
