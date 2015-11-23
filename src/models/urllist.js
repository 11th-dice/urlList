'use strict';
module.exports = function(sequelize, DataTypes) {
  var urllist = sequelize.define('urllist', {
    url: DataTypes.TEXT,
    title: DataTypes.STRING,
    sts: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return urllist;
};