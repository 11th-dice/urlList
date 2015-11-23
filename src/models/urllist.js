'use strict';
module.exports = function(sequelize, DataTypes) {
  var urllist = sequelize.define('urllist', {
    url: {
      type: DataTypes.TEXT
      , allowNull: false
    }
    , title: {
      type: DataTypes.STRING
      , allowNull: false
    }
    , sts: {
      type: DataTypes.INTEGER
      , defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return urllist;
};