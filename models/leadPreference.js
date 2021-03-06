'use strict';
module.exports = (sequelize, DataTypes) => {
  const LeadPreference = sequelize.define('LeadPreference', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    enrolled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  LeadPreference.associate = (models) => {
    models.LeadPreference.belongsTo(models.PreferenceCenter, {
      foreignKey: {
        name: 'preferenceId'
      }
    });
    models.LeadPreference.belongsTo(models.Lead, {
      foreignKey: {
        name: 'leadId'
      }
    });
  }

  return LeadPreference;
};

