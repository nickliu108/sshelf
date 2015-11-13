// export this module, so that it is accessible to our application modules
module.exports = Pages;
 
// Pages constructor
function Pages() {
    if (!(this instanceof Pages)) {
            return new Pages();
    }
    // require mongodb
    var mongo = require('mongodb');
    var db = require('monk')('localhost/Magazine');
    this.magazine = db.get('Pages');
};

//Retrieve all pages base on the feature id
Pages.prototype.findAllPage = function(feature_id,success, error) {
    this.magazine.find({feature_id : feature_id}, response(success, error));
};

//get page by ID
Pages.prototype.findById = function(page_id,success, error) {
    this.magazine.findOne({_id : page_id}, response(success, error));
};

//delete page by ID
Pages.prototype.deletePage = function(page_id,success, error) {
    this.magazine.remove({_id : page_id}, response(success, error));
};

//create page
Pages.prototype.createPage = function(issue_no, feature_id, feature_name, pageOrder, channel, success, error) {
    var issue_number = (typeof issue_no === undefined) ? 1 : issue_no,
        feature_id_ = (typeof feature_id === undefined) ? "54c755c491debd469d4e09a1" : feature_id,
        pageOrder_ = (typeof pageOrder === undefined) ? 99 : pageOrder,
        channel_ = (typeof channel === undefined) ? "global" : channel;
    if(channel_ =="global"){
        var newfolderPath = "/images/magazine/issue_"+issue_number+"/"+feature_name+"/common/page_"+pageOrder_+"/productsBG.jpg";
    }
    else{
        var newfolderPath = "/images/magazine/issue_"+issue_number+"/"+feature_name+"/common/page_"+pageOrder_+"_"+ channel +"/productsBG.jpg";
    }
    this.magazine.insert({
        "issue_no" : issue_number,
        "feature_id" : feature_id_,
        "page_order" : pageOrder_,
        "channel" : channel_,
        "meta-data" : {
            "page_title" : {
                "en" : "Page Title",
                "fr" : "Page Title(French)",
                "de" : "Page Title(German)",
                "zh" : "Page Title(Chinese)"
            },
            "page_description" : {
                "en" : "Page description",
                "fr" : "Page description(French)",
                "de" : "Page description(German)",
                "zh" : "Page description(Chinese)"
            },
            "page_keyword" : {
                "en" : "SEO key word",
                "fr" : "SEO key word(French)",
                "de" : "SEO key word(German)",
                "zh" : "SEO key word(Chinese)"
            }
        },
        "background" : {
            "en" : newfolderPath,
            "fr" : newfolderPath,
            "de" : newfolderPath,
            "zh" : newfolderPath
        },
        "main" : {
            "en" : "",
            "fr" : "",
            "de" : "",
            "zh" : ""
        },
        "credit" : {
            "en" : "",
            "fr" : "",
            "de" : "",
            "zh" : ""
        },
        "script" : "",
        "mapping" : ""
    }, response(success, error));
};

//update everything in the page
Pages.prototype.updatePage = function(page_id, updated_page, success, error) {
    this.magazine.update({_id : page_id}, updated_page, response(success, error));
};
 
var response = function(success, error) {
    return function(err, doc) {
        if (err) {
            error(err);
        } else {
            success(doc);
        }
    };
};
