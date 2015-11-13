var express = require('express');
var router = express.Router();

var issueAPI = require('./issues');
var featureAPI = require('./features');

router.get('/API/issues', issueAPI.findAllIssueInfo);
router.get('/API/issues/:issue_No/features', issueAPI.findAllFeatures);
router.get('/API/issues/:issue_No', issueAPI.findById);
router.post('/API/issues', issueAPI.create);
router.delete('/API/issues/:issue_No', issueAPI.removeById);
router.put('/API/issues/:issue_No', issueAPI.update);
router.get('/API/recentIssue', issueAPI.findNewIssue);

//feature api
router.get('/API/features/:feature_id', featureAPI.findFeatureById);
router.get('/API/features/pages/:id', featureAPI.findAllPage);
router.post('/API/features/addFeature', featureAPI.createBlankFeature);

/* GET home page. */
router.get('/', function(req, res) {
    res.render('magazine/index', { url: '/stylesheets/bootstrap/'});
});

router.get('/:issueNumber/features/:feature_id', function(req, res){
    console.log("rendering feature page");
    console.log("issue param: "+ req.params.issue_No);
    console.log("feature id: " + req.params.feature_id);
	res.render('magazine/partials/featurePage',{ 
		url: '/stylesheets/bootstrap/', 
		issue_id : req.params.issue_No,
		feature_id : req.params.feature_id
	});
});


router.get('/partials/issuePage', function(req, res) {
    res.render('magazine/partials/issuePage');
});

router.get('/partials/featurePage', function(req, res) {
    res.render('magazine/partials/featurePage', { url: '/stylesheets/bootstrap/'});
});

router.get('/partials/:issueNumber/featurePage/:featureID', function(req, res) {
    res.render('magazine/partials/featurePage', { 
        url: '/stylesheets/bootstrap/', 
        issue_id : req.params.issueNumber,
        feature_id : req.params.featureID
    });
});

router.get('/partials/specificPage', function(req, res) {
    res.render('magazine/partials/specificPage', { url: '/stylesheets/bootstrap/', magazineStyle: "/stylesheets/magazine/magazine.css", magazineLayoutStyle: "/stylesheets/magazine/magazineGridAndStyleGuidesV2.css"});
});

router.get('/partials/specificPage/:pageID', function(req, res) {
    res.render('magazine/partials/specificPage', { url: '/stylesheets/bootstrap/', page_id : req.params.pageID});
});

module.exports = router;


