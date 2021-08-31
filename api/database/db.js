const mysql = require('mysql')
const config = require('./db.config')

const connection = mysql.createConnection({
	host: config.host, 
	port: config.port,
    user: config.user,
    database: config.database,
    password: config.password
})

connection.connect( error => {
	console.log( error ? error.message :  "Mysql connected.");
})

module.exports = connection;