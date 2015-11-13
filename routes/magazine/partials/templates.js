exports.getTemplate = function(req, res) {
    console.log('get Template ' + req.params.name);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
};

/*
exports.createBlankPage = function(req, res) {
	console.log('create a blank page ');
    console.log('issue no: '+ req.params.issueNo+" featureID: "+req.params.featureID+" channel: "+req.params.channel);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.createPage(req.params.issueNo, req.params.featureID, req.params.channel, ok, err);
};

exports.deletePage = function(req, res) {
	console.log('remove page: ' + req.params.id);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.deletePage(req.params.id, ok, err);
};

exports.updatePageById = function(req, res) {
	console.log('update page: ' + req.params.id);
    var ok = function(doc) {
            res.json(doc);
    };
    var err = function(err) {
            res.send(404);
    };
    page.updatePage(req.params.id, req.body, ok, err);
};
*/