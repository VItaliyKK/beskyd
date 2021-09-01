'use strict'

const response = require('../response');
const db = require('../database/db');


exports.list = (req, res) => {
	const sql = "SELECT * FROM `students`";

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

	const sql = "SELECT * FROM `students` WHERE `id` = " + req.params.id;

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
	const data = [
		req.body.group_id, 
		req.body.name, 
		req.body.last_name, 
		req.body.surname,
		req.body.birthdate
	]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "INSERT INTO `students` (`id`, `group_id`, `name`, `last_name`, `surname`, `birthdate`, `email`) VALUES (NULL, "
		+ req.body.group_id+", '"+req.body.name+"', '"+req.body.last_name+"', '" 
		+ req.body.surname+"', '"+ req.body.birthdate+"', '"+req.body.email+"')"

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

	const data = [
		req.body.group_id, 
		req.body.name, 
		req.body.last_name, 
		req.body.surname,
		req.body.birthdate
	]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "UPDATE `students` SET `group_id` = "+req.body.group_id+", `name` = '" 
		+ req.body.name+"', `last_name` = '"+req.body.last_name+"', `surname` = '"
		+ req.body.surname+"', `birthdate` = '"+req.body.birthdate+"', `email` = '" 
		+ req.body.email+"' WHERE `students`.`id` = "+req.params.id;

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

	const sql = "DELETE FROM `students` WHERE `students`.`id` = "+req.params.id;

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}