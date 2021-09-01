'use strict'

exports.send = function(status, result, response){
	response.status(status);
	
	response.json({
		"status": status,
		"result": result
	});

	response.end();
}