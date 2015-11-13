var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('utility/debug', { url: '/stylesheets/bootstrap/'});
});

module.exports = router;


