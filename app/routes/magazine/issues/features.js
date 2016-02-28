var page = require('../../../model/magazine/pages')();
var feature = require('../../../model/magazine/features')();

exports.findAllPage = function(req, res) {
        console.log('get all Feature info ');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        page.findAllPage(req.params.pageId, ok, err);
};

exports.findFeatureById = function(req, res) {
        console.log('get Feature ' + req.params.feature_id + ' info');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        feature.findById(req.params.feature_id, ok, err);
};

exports.createBlankFeature = function(req, res) {
        console.log('create a blank feature ');
    var issueNo = req.query.issueNo,
        featureOrder = req.query.featureOrder,
        featureName = req.query.featureName;

    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    feature.createFeature(issueNo, featureOrder, featureName, ok, err);
};