var page = require('../../../model/magazine/pages')();

exports.findPageById = function(req, res) {
    console.log('get Page ' + req.params.id + ' info');
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.findById(req.params.id, ok, err);
};

exports.createBlankPage = function(req, res) {
	console.log('create a blank page ');
    var issueNo = req.query.issueNo,
        featureID = req.query.featureID,
        featureName = req.query.featureName,
        pageNo = req.query.pageNo,
        channel = req.query.channel;

    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    console.log(req.params.pageNo);
    page.createPage(issueNo, featureID, featureName, pageNo, channel, ok, err);
};

exports.deletePage = function(req, res) {
	console.log('remove page: ' + req.params.id);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.deletePage(req.params.id, ok, err);
};

exports.updatePageById = function(req, res) {
	console.log('update page: ' + req.params.id);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.updatePage(req.params.id, req.body, ok, err);
};