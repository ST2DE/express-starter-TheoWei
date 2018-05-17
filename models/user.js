'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING 
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};