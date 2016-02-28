// export this module, so that it is accessible to our application modules
module.exports = Issues;
 
// Issues constructor
function Images() {
        if (!(this instanceof Issues)) {
                return new Issues();
        }
        // require mongodb
        var mongo = require('mongodb');
        // Connect to our mongodb running on localhost and named 'test'
        var db = require('monk')('localhost/Magazine');
        // obtain a reference to our cars collection within mongodb
        this.magazine = db.get('Issues');
};
 
// Retrieve a car by its id
Issues.prototype.findById = function(id, success, error) {
        this.magazine.findOne({issue_no: id}, response(success,error));
};
 
// Persist a new car document to mongodb
Issues.prototype.create = function(car, success, error) {
        this.magazine.insert(car, response(success,error));
};
 
// Update an existing car document by id in mongodb
Issues.prototype.update = function(car, success, error) {
    console.log("carID : "+ car.carID);
    console.log("carName : "+ car.carName);
    this.magazine.findAndModify({
        query : {carID : car.carID}, 
        update : { $set: { carName: car.carName }}
    },
        response(success, error)
    );
};
 
// Remove a car by id from the mongodb
Issues.prototype.removeById = function(id, success, error) {
    this.cars.remove({carID : id}, response(success, error));
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