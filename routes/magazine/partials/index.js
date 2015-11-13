var express = require('express');
var router = express.Router();

var templateAPI = require('./templates');

router.get('/:name', templateAPI.getTemplate);

module.exports = router;


