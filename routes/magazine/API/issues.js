var express = require('express');
var router = express.Router();

var issue = require('../../../model/magazine/issues')();
var feature = require('../../../model/magazine/features')();

var editAPIHandler = function(){
    function findNewIssue(req, res){
        console.log('get the most recent Issues info ');
        var ok = function(doc) {
                console.log(doc.sort()[0]);
                res.json(doc.sort()[0]);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findAllIssueInfo(ok, err);
    }

    function findAllIssueInfo(req, res) {
        console.log('get all Issues info ');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findAllIssueInfo(ok, err);
    }

    function findAllFeatures(req, res) {
        console.log('get all features in Issue ' + req.params.issueNumber);
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        feature.findAllFeatures(req.params.issueNumber, ok, err);
    }

    function findIssueById(req, res) {
        console.log('get Issue ' + req.params.issueNumber + ' info');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findById(req.params.issueNumber, ok, err);
    }
     
    function createIssue(req, res) {
        var ok = function(doc) {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("cars");
                // And forward to success page
                res.redirect("cars");
                res.send(201);
        };
        var err = function(err) {
                res.send(409, "Failed to create car");
        };
        issue.create(req.body, ok, err);
    }
     
    function updateIssue(req, res) {
        if (!req.body.carID) {
                res.send(404, "id required");
        } else {
                var ok = function(doc) {
                        res.send(200);
                };
                var err = function(err) {
                        res.send(409, "update failed");
                };
                issue.update(req.body, ok, err);
        }
    }
     
    function deleteIssueById(req, res) {
        console.log("remove issue by ID");
        var ok = function(doc) {
                res.send(200);
        };
        var err = function(err) {
                res.send(409, "Failed to remove car");
        };
        issue.removeById(req.params.issueNumber, ok, err);
    }

    return {
        findNewIssue: findNewIssue,
        findAllIssueInfo: findAllIssueInfo,
        findAllFeatures: findAllFeatures,
        findIssueById: findIssueById,
        createIssue: createIssue,
        updateIssue: updateIssue,
        deleteIssueById: deleteIssueById
    };
}();

router.get('/', editAPIHandler.findAllIssueInfo);
router.get('/:issueNumber/features', editAPIHandler.findAllFeatures);
router.route('/:issueNumber')
    .get(editAPIHandler.findIssueById)
    .post(editAPIHandler.createIssue)
    .delete(editAPIHandler.deleteIssueById)
    .put(editAPIHandler.updateIssue);
router.get('/recentIssue', editAPIHandler.findNewIssue);

module.exports = router;