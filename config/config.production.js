const config = require('./config.global');

config.env = 'production';
config.hostname = process.env.DB_HOSTNAME;

config.db = {
    database: 'leadCampaign',
    username: 'manifestUser',
    password: 'manifestPassword',
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    sequelizeParams: {
        dialect: 'postgres',
        host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com"
    }
}
 
module.exports = config;

 
     