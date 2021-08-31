'use strict'

exports.index = (req, res) => {
	const db = require('../database/db');

	db.query('SELECT * FROM `students`', (error, rows, fields) => {
		if( error ){
			console.log(error)
		} else {
			res.status(200)
			res.json({
				'result': rows
			})
			res.end()
		}
	});
}