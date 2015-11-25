var express = require('express');
var router = express.Router();

var issue = require('../../../model/magazine/issues')();
var feature = require('../../../model/magazine/features')();

var setupAPIRoutes = (function(){
    function findNewIssue(req, res) {
        console.log('get the most recent Issues info ');
        var ok = function(doc) {
                console.log(doc.sort()[0]);
                res.json(doc.sort()[0]);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findAllIssueInfo(ok, err);
    };

    function findAllIssueInfo(req, res) {
        console.log('get all Issues info ');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findAllIssueInfo(ok, err);
    };

    function findAllFeatures(req, res) {
        console.log('get all features in Issue ' + req.params.issue_No);
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        feature.findAllFeatures(req.params.issue_No, ok, err);
    };
     
    function findById(req, res) {
        console.log('get Issue ' + req.params.issue_No + ' info');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findById(req.params.issue_No, ok, err);
    };
     
    function create(req, res) {
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
    };
     
    function update(req, res) {
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
    };
     
    function removeById(req, res) {
        console.log("remove issue by ID");
        var ok = function(doc) {
                res.send(200);
        };
        var err = function(err) {
                res.send(409, "Failed to remove car");
        };
        issue.removeById(req.params.issue_No, ok, err);
    };

    return {
        findNewIssue: findNewIssue,
        findAllIssueInfo: findAllIssueInfo,
        findAllFeatures: findAllFeatures,
        findById: findById,
        create: create,
        update: update,
        removeById: removeById,

    };
})();

module.exports = {
    setupAPIRoutes : setupAPIRoutes
}