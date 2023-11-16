'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'email', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('users', 'password', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
},

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'email', { transaction: t }),
        queryInterface.removeColumn('users', 'password', { transaction: t })
      ]);
    });
  }
};
