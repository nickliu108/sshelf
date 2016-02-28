var express = require('express');
var router = express.Router();

var pageAPI = require('./pages');

router.get('/:id', pageAPI.findPageById);
router.post('/addPage', pageAPI.createBlankPage);
router.delete('/:id', pageAPI.deletePage);
router.put('/:id', pageAPI.updatePageById);

module.exports = router;


