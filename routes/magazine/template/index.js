var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('magazine/index', { url: '/stylesheets/bootstrap/'});
});

module.exports = router;