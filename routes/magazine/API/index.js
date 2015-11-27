var issueAPIs = require('./issues');
var router = require('express').Router();

router.use(function loging(req, res, next){
	console.log("APIs running");
	console.log('originalUrl: ', req.originalUrl);
	console.log('baseUrl: ', req.baseUrl);
	console.log('path: ', req.path);
	next();
});

router.get('/', function(req, res, next){
	res.send('APIs working');
});

router.use('/issues', issueAPIs);
// router.get('/features', featureAPIs);
// router.get('/pages', pageAPIs);

module.exports = router;