const mysql = require('mysql')
const { host, port, user, database, password } = require('./db.config');

const connection = mysql.createConnection({ host, port, user, database, password });

connection.connect( error => {
	console.log( error ? error.message :  "Mysql connected.");
})

module.exports = connection;