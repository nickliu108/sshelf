var issue = require('../../../model/magazine/issues')();
var feature = require('../../../model/magazine/features')();

exports.findNewIssue = function(req, res) {
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

exports.findAllIssueInfo = function(req, res) {
        console.log('get all Issues info ');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findAllIssueInfo(ok, err);
};

exports.findAllFeatures = function(req, res) {
        console.log('get all features in Issue ' + req.params.issue_No);
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        feature.findAllFeatures(req.params.issue_No, ok, err);
};
 
exports.findById = function(req, res) {
        console.log('get Issue ' + req.params.issue_No + ' info');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        issue.findById(req.params.issue_No, ok, err);
};
 
exports.create = function(req, res) {
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
 
exports.update = function(req, res) {
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
 
exports.removeById = function(req, res) {
        console.log("remove issue by ID");
        var ok = function(doc) {
                res.send(200);
        };
        var err = function(err) {
                res.send(409, "Failed to remove car");
        };
        issue.removeById(req.params.issue_No, ok, err);
};