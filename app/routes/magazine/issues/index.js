var magazineAPI = require('../API/index');
var magazineTemplate = require('../template/index');
var issueAPI = require('./issues');
var featureAPI = require('./features');

var magazineRoute = function(app){
	app.get('/tool/magazine', function(req, res, next){
	    console.log('running');
	    res.send('working');
	});

	app.use('/tool/magazine/APIs', magazineAPI);
	app.use('/tool/magazine/template', magazineTemplate);
};




// /* GET home page. */
// router.get('/', function(req, res) {
//     res.render('magazine/index', { url: '/stylesheets/bootstrap/'});
// });

// router.get('/:issue_No/features/:feature_id', function(req, res){
//     console.log("rendering feature page");
//     console.log("issue param: "+ req.params.issue_No);
//     console.log("feature id: " + req.params.feature_id);
// 	res.render('magazine/partials/featurePage',{ 
// 		url: '/stylesheets/bootstrap/', 
// 		issue_id : req.params.issue_No,
// 		feature_id : req.params.feature_id
// 	});
// });


// router.get('/partials/issuePage', function(req, res) {
//     res.render('magazine/partials/issuePage');
// });

// router.get('/partials/featurePage', function(req, res) {
//     res.render('magazine/partials/featurePage', { url: '/stylesheets/bootstrap/'});
// });

// router.get('/partials/:issue_No/featurePage/:featureID', function(req, res) {
//     res.render('magazine/partials/featurePage', { 
//         url: '/stylesheets/bootstrap/', 
//         issue_id : req.params.issueNumber,
//         feature_id : req.params.featureID
//     });
// });

// router.get('/partials/specificPage', function(req, res) {
//     res.render('magazine/partials/specificPage', { url: '/stylesheets/bootstrap/', magazineStyle: "/stylesheets/magazine/magazine.css", magazineLayoutStyle: "/stylesheets/magazine/magazineGridAndStyleGuidesV2.css"});
// });

// router.get('/partials/specificPage/:pageID', function(req, res) {
//     res.render('magazine/partials/specificPage', { url: '/stylesheets/bootstrap/', page_id : req.params.pageID});
// });

module.exports = {
	magazineRoute: magazineRoute
};


