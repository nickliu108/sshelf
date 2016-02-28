var express = require('express');
var router = express.Router();

var page = require('../../../model/magazine/pages')();
var feature = require('../../../model/magazine/features')();

var editAPIHandler = function(){
    function findAllPages(req, res) {
            console.log('get all Feature info ');
            var ok = function(doc) {
                    res.json(doc);
            };
            var err = function(err) {
                res.send(err.toString());
            };
            page.findAllPage(req.params.featureId, ok, err);
    };

    function findFeatureById(req, res) {
            console.log('get Feature ' + req.params.featureId + ' info');
            var ok = function(doc) {
                    res.json(doc);
            };
            var err = function(err) {
                res.send(err.toString());
            };
            feature.findById(req.params.featureId, ok, err);
    };

    function createFeature(req, res) {
        console.log('create a blank feature ');
        var issueNo = req.query.issueNo,
            featureOrder = req.query.featureOrder,
            featureName = req.query.featureName;

        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
            res.send(err.toString());
        };
        feature.createFeature(issueNo, featureOrder, featureName, ok, err);
    };

    function deleteFeatureById(req, res) {
        console.log("remove feature by ID");
    }

    function updateFeature(req, res){
        console.log('update feature');
    }

    return {
        findAllPages: findAllPages,
        findFeatureById: findFeatureById,
        createFeature: createFeature,
        deleteFeatureById: deleteFeatureById,
        updateFeature: updateFeature
    };
}();

router.get('/:featureId/pages', editAPIHandler.findAllPages);

router.route('/:featureId')
    .get(editAPIHandler.findFeatureById)
    .post(editAPIHandler.createFeature)
    .delete(editAPIHandler.deleteFeatureById)
    .put(editAPIHandler.updateFeature);

module.exports = router;