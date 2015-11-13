module.exports = Images;
    var mongo = require('mongodb');
// Assets constructor
function Images() {
        if (!(this instanceof Images)) {
                return new Images();
        }
        // require mongodb
        var mongo = require('mongodb'),
            db = require('monk')('localhost/assets');
        this.imagesDB = db.get('images');
};
 
//get image by ID
Images.prototype.findById = function(imageID, success,error) {
    this.imagesDB.findOne({_id: imageID},response(success, error));
};
 
// save a new image
Images.prototype.update = function(imagelocation,imagename, success, error) {
    this.imagesDB.insert({imagepath: imagelocation+imagename}, response(success,error));
};
 
// Remove a car by id from the mongodb
Images.prototype.removeById = function(id, success, error) {
    this.imagesDB.remove({_id : id}, response(success, error));
};
 
// Callback to the supplied success and error functions
// The caller will supply this function. The callers implementation
// will provide the necessary logic. In the case of the sample app,
// the caller's implementation will send an appropriate http response.
var response = function(success, error) {
        return function(err, doc) {
                if (err) {
                        // an error occurred, call the supplied error function
                        error(err);
                } else {
                        // call the supplied success function
                        success(doc);
                }
        };
}