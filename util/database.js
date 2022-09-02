const Sequelize = require('sequelize')
const dotenv = require('dotenv');

// get config vars
dotenv.config();



/*const sequelize = new Sequelize('expense-tracker', 'root', 'ple8Nu@m',{
    dialect: 'mysql',
    host: 'localhost'
})*/

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect: 'mysql',
    host: process.env.DB_HOST
})



module.exports = sequelize;
