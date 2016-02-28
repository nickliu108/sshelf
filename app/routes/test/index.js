var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res) {
    res.render('test/test');
});

router.get('/1', function(req, res) {
    res.render('test/test1');
});

module.exports = router;


