'use strict'

const response = require('../response');
const db = require('../database/db');


exports.list = (req, res) => {
	const sql = "SELECT * FROM `departments`";

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}


exports.single = (req, res) => {
	if( !req.params.id || !+req.params.id ){
		return response.send(422, {
			'message': 'Bad query parameter: id'
		}, res);
	}

	const sql = "SELECT * FROM `departments` WHERE `id` = " + req.params.id;

	db.query(sql, (error, rows, fields) => {
		if( error ){
			return response.send(500, error, res);
		} else if ( !rows.length ) {
			return response.send(404, {
				'message': 'Instance not found'
			}, res);
		} else {
			response.send(200, rows[0], res);
		}
	});
}


exports.add = (req, res) => {
	const data = [req.body.name, req.body.abbr, req.body.founded]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "INSERT INTO `departments` (`id`, `name`, `abbr`, `founded`, `logo`, `created_at`) VALUES (NULL, '"
		+ req.body.name+"', '"+req.body.abbr+"', '"+req.body.founded+"', NULL, CURRENT_TIMESTAMP)"

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}


exports.update = (req, res) => {
	if( !req.params.id || !+req.params.id ){
		return response.send(422, {
			'message': 'Bad query parameter: id'
		}, res);
	}

	const data = [req.body.name, req.body.abbr, req.body.founded]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "UPDATE `departments` SET `name` = '"+req.body.name+"', `abbr` = '"+req.body.abbr
		+ "', `founded` = '"+req.body.founded+"' WHERE `departments`.`id` = "+req.params.id;

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}


exports.delete = (req, res) => {
	if( !req.params.id || !+req.params.id ){
		return response.send(422, {
			'message': 'Bad query parameter: id'
		}, res);
	}

	const sql = "DELETE FROM `departments` WHERE `departments`.`id` = "+req.params.id;

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}