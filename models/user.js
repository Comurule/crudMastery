'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [3, 50] // must be between 3 and 50.
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true
    },

    last_login: {
      type: DataTypes.DATE
    },
    isLead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },//Added this to Upgrade a user to a lead 
    //I believe whoever handles Customers should 
    //another field to activate A customer

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },

    // you can also write in a single line without issues
    permission: { type: DataTypes.STRING },
    module_name: { type: DataTypes.STRING },
    module_id: { type: DataTypes.INTEGER },
    account_id: { type: DataTypes.STRING }

  });


  User.associate = (models) => {

    models.User.hasMany(models.Post);

    models.User.belongsTo(models.Department, {
      allowNull: true
    });

    models.User.belongsTo(models.Profile, {
      allowNull: true
    });

    models.User.belongsTo(models.Role, {
      allowNull: true
    });

    models.User.belongsTo(models.CurrentBusiness, {
      allowNull: true
    });

    models.User.hasMany(models.CampaignData, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    
    models.User.hasMany(models.LeadCampaign, {
      foreignKey: {
        name: 'leadId',
        allowNull: false
      }
    });

    // models.User.belongsToMany(models.Campaign, {
    //   as: 'campaigns',
    //   through: 'CampaignMembers',
    //   onDelete: 'CASCADE',
    //   foreignKey: 'userId'
    // });
  
      models.User.belongsToMany(models.Permission,{ 
        as: 'permissions', 
        through: 'UserPermissions',
        foreignKey: 'user_id'
      });

  };

  return User;
};
