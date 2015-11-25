var issueAPIs = require('./issues');

module.exports = function(){
	var app = require('express')();
	app.get('/', function(req, res,next){
		console.log("APIs running");
		res.send('APIs working');
	});

	return app;
}();