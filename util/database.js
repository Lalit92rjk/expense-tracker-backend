const Sequelize = require('sequelize')



const sequelize = new Sequelize('expense-tracker', 'root', 'ple8Nu@m',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;
