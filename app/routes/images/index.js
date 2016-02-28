var express = require('express');
var router = express.Router();

var imageResource = require('./images');

router.get('/show/:id', imageResource.findById);

router.get('/images/:id', imageResource.getImagePathById);
router.post('/duplicateImageTo', imageResource.defaultImage);
router.post('/images', imageResource.update);
router.post('/fixImages', imageResource.updateTo);

router.delete('/images/:id', imageResource.removeById);


/*for demo only*/
router.get('/', function(req, res) {
    res.send('images API');
});

router.get('/newimage', function(req, res) {
    res.render('images/newimage', { title: 'Add New Image' });
});

router.get('/newimageTo', function(req, res) {
    res.render('images/newimageTo', { title: 'Add New Image' });
});

router.get('/deleteimage', function(req, res) {
    res.render('images/deleteimage', { title: 'Delete Image' });
});

module.exports = router;


