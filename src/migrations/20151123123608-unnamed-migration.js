'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn(
      'urllists'
      , 'url'
      , {
          type: Sequelize.TEXT
          , allowNull: false
      })
      .then(function () {
        return queryInterface.changeColumn(
          'urllists'
          , 'title'
          , {
            type: Sequelize.STRING
            , allowNull: false
          }
        );
      })
      .then(function () {
        return queryInterface.changeColumn(
          'urllists'
          , 'sts'
          , {
            type: Sequelize.INTEGER
            , defaultValue: 0
          }
        );
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'urllists'
      , 'url'
      , {
          type: Sequelize.TEXT
      })
      .then(function () {
        return queryInterface.changeColumn(
          'urllists'
          , 'title'
          , {
            type: Sequelize.STRING
          }
        );
      })
      .then(function () {
        return queryInterface.changeColumn(
          'urllists'
          , 'sts'
          , {
            type: Sequelize.INTEGER
          }
        );
      });
  }
};
