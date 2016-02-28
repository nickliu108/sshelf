// export this module, so that it is accessible to our application modules
module.exports = Features;
 
var ObjectId = require('mongodb').ObjectID;

// Features constructor
function Features() {
        if (!(this instanceof Features)) {
                return new Features();
        }
        // require mongodb
        var mongo = require('mongodb');
        // Connect to our mongodb running on localhost and named 'test'
        var db = require('monk')('localhost/Magazine');
        // obtain a reference to our cars collection within mongodb
        this.issue = db.get('Issues');
        this.feature = db.get('Features');
};

//Retrieve all features base on the issue no
Features.prototype.findAllFeatures = function(issue_no,success, error) {
    this.feature.find({ "issue_no" :  issue_no }, response(success, error) );
};

Features.prototype.findById = function(feature_id,success, error) {
    this.feature.findOne({_id : feature_id}, response(success, error));
};

//create feature
Features.prototype.createFeature = function(issue_no, featureOrder, feature_name, success, error) {
    var issue_number = (typeof issue_no === undefined) ? 1 : issue_no,
        featureOrder_ = (typeof featureOrder === undefined) ? 99 : featureOrder,
        feature_name_ = (typeof feature_name === undefined) ? "feature name" : feature_name;
    
    var newfolderPath = "/images/magazine/issue_"+issue_number+"/"+feature_name+"/en/"+"/thumbnail.jpg";
    
    this.magazine.insert({
        "issue_no" : issue_number,
        "feature_rank" : featureOrder_,
        "thumbnail" : {
            "en" : newfolderPath,
            "fr" : newfolderPath,
            "de" : newfolderPath,
            "zh" : newfolderPath
        },
        "meta_data" : {
            "feature_name" : {
                "en" : "",
                "fr" : "",
                "de" : "",
                "zh" : ""
            },
            "feature_description" : {
                "en" : "",
                "fr" : "",
                "de" : "",
                "zh" : ""
            }
        }
    }, response(success, error));
};
 
var response = function(success, error) {
        return function(err, doc) {
                if (err) {
                        // an error occurred, call the supplied error function
                        error(err);
                } else {
                        // call the supplied success function
                        //doc.sort({ feature_rank: 1 });
                        success(doc);
                }
        };
}