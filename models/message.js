'use strict';
module.exports = (sequelize, DataTypes) => {
  var Messages = sequelize.define('Messages', {
    content:{
        type: DataTypes.STRING 
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Messages;
};