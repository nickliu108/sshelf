var images = require('../../../model/magazine/images')();
 
exports.findById = function(req, res) {
        console.log('get Issue ' + req.params.id + ' info');
        var ok = function(doc) {
                res.json(doc);
        };
        var err = function(err) {
                res.send(404);
        };
        images.findById(req.params.id, ok, err);
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
        images.create(req.body, ok, err);
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
                images.update(req.body, ok, err);
        }
};
 
exports.removeById = function(req, res) {
        console.log("remove images by ID");
        var ok = function(doc) {
                res.send(200);
        };
        var err = function(err) {
                res.send(409, "Failed to remove car");
        };
        images.removeById(req.params.id, ok, err);
};