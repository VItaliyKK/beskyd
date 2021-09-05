'use strict'

const response = require('../response');
const db = require('../database/db');


exports.list = (req, res) => {
	const sql = "SELECT `groups`.`id`, `groups`.`abbr`, `groups`.`form_education`, `groups`.`department_id`, `groups`.`max_quantity_members`, `departments`.`name` FROM `groups` LEFT OUTER JOIN `departments` ON departments.id = groups.department_id";

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

	const sql = "SELECT `groups`.`id`, `groups`.`abbr`, `groups`.`form_education`, `groups`.`department_id`, `groups`.`max_quantity_members`, `departments`.`name` FROM `groups` LEFT OUTER JOIN `departments` ON departments.id = groups.department_id WHERE `groups`.`id` = " + req.params.id;

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
		req.body.abbr, 
		req.body.form_education, 
		req.body.department_id, 
		req.body.max_quantity_members
	]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "INSERT INTO `groups` (`id`, `abbr`, `form_education`, `department_id`, `max_quantity_members`) VALUES (NULL, '"
		+ req.body.abbr+"', '"+req.body.form_education+"', "
		+ req.body.department_id+", "+req.body.max_quantity_members+")";

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
		req.body.abbr, 
		req.body.form_education, 
		req.body.department_id, 
		req.body.max_quantity_members
	]
	if( !data.every( field => field) ){
		return response.send(400, {
			'message': 'Required fields cannot be empty'
		}, res);
	}

	const sql = "UPDATE `groups` SET `abbr` = '"+req.body.abbr+"', `form_education` = '"+req.body.form_education 
		+ "', `department_id` = "+req.body.department_id+", `max_quantity_members` = "+req.body.max_quantity_members
		+ " WHERE `groups`.`id` = "+req.params.id;

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

	const sql = "DELETE FROM `groups` WHERE `groups`.`id` = "+req.params.id;

	db.query(sql, (error, rows, fields) => {
		if( error ){
			response.send(500, error, res);
		} else {
			response.send(200, rows, res);
		}
	});
}