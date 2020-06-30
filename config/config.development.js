const config = require('./config.global');

config.env = 'development';
config.hostname = 'manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com';
config.db = {
    database: 'teamcomuruledb1',
    username: 'manifestUser',
    password: 'manifestPassword',
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    sequelizeParams: {
        dialect: 'postgres',
        host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com"
    }
}
 
 
module.exports = config;

 