'use strict'

module.exports = (app) => {
	const departmentController = require('../controllers/departmentController.js');

	app.route('/').get(departmentController.index);
}