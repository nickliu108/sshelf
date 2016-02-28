var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('magazine/index', { url: '/stylesheets/bootstrap/'});
});

router.get('/test', function(req, res){
	res.send('test');
});

module.exports = router;
