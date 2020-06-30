'use strict';
module.exports = (sequelize, DataTypes) => {
  var CurrentBusiness = sequelize.define('CurrentBusiness', {
       current_business_name: {
        type: DataTypes.STRING,
        allowNull: false,
        }
  });
 
  
  // create association between current business and user or post
  CurrentBusiness.associate = function(models) {
    
    // a current business can have many users
    // a user belongs to a current business
    // this is not the final relationship between user and current business, 
    // but for simplicity lets leave it this way
    models.CurrentBusiness.hasMany(models.User);
    
    // a current business can have many posts
    // a post belongs to a current business
    models.CurrentBusiness.hasMany(models.Post);
    
  };
  
  return CurrentBusiness;
};

 