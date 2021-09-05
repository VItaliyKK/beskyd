'use strict'

module.exports = (app) => {
	const response = require('../response');

	const departmentController = require('../controllers/DepartmentController.js');

	app.route('/api/department/get/list').get(departmentController.list);
	app.route('/api/department/:id').get(departmentController.single);
	app.route('/api/department/add').post(departmentController.add);
	app.route('/api/department/:id').put(departmentController.update);
	app.route('/api/department/:id').delete(departmentController.delete);

	const groupController = require('../controllers/GroupController.js');

	app.route('/api/group/get/list').get(groupController.list);
	app.route('/api/group/:id').get(groupController.single);
	app.route('/api/group/add').post(groupController.add);
	app.route('/api/group/:id').put(groupController.update);
	app.route('/api/group/:id').delete(groupController.delete);

	const studentController = require('../controllers/StudentController.js');

	app.route('/api/student/get/list/full').get(studentController.fulllist);
	app.route('/api/student/get/list').get(studentController.list);
	app.route('/api/student/:id/full').get(studentController.fullsingle);
	app.route('/api/student/:id').get(studentController.single);
	app.route('/api/student/add').post(studentController.add);
	app.route('/api/student/:id').put(studentController.update);
	app.route('/api/student/:id').delete(studentController.delete);

	app.route('**').get(function (req, res) {
		response.send(404, {
			'message': 'Page not found'
		}, res);
	});
}