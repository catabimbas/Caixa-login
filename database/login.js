const Sequelize = require('sequelize')
const connection = require('./database')

const Caixa = connection.define('forms_logs', {
    usuario: {
        type: Sequelize.STRING,
        allownull: false
    },
    email:{
        type: Sequelize.STRING,
        allownull: false
    },
    senha:{
        type: Sequelize.STRING,
        allownull: false
    }
})

Caixa.sync({force: false}).then(() => {
    console.log("Created table")
})

module.exports = Caixa