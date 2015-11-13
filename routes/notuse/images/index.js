var express = require('express');
var router = express.Router();

var issueAPI = require('./imageAPI');

router.get('/issues/:id', issueAPI.findById);
router.post('/issues', issueAPI.create);
router.delete('/issues/:id', issueAPI.removeById);
router.put('/issues/:id', issueAPI.update);

module.exports = router;


