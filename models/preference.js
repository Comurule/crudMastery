'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    preference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // create association between user and role
  // a can have many users
  Preference.associate = (models) => {
    models.Preference.belongsToMany(models.User, {
      as: 'users',
      through: 'LeadPreferences',
      foreignKey: 'preferenceId'
    });
  };

  return Preference;
};

