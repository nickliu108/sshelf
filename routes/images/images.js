var images = require('../../model/images/images')();
var fse = require('fs-extra');
var imagelocation;

exports.findById = function(req,res){
	var ok = function(doc) {
        res.render('images/oneimage', { imgurl: doc.imagepath });
    };
    var err = function(err) {
        res.send(404);
    };
    images.findById(req.params.id, ok, err);
};

exports.getImagePathById = function(req,res){
	var ok = function(doc) {
        res.send( doc.imagepath );
    };
    var err = function(err) {
        res.send(404);
    };
    images.findById(req.params.id, ok, err);
};

exports.update = function(req, res) {
	var ok = function(docs) {
		res.redirect( "show/" + docs._id);
    };
    var err = function(err) {
        res.send(409, "Failed to create the image");
    };
	updateWithName(req,res,true, ok, err);
};

exports.updateTo = function(req, res) {
    var ok = function(docs) {
        res.redirect( "/tool/magazine/" );
        res.send( 200 );
    };
    var err = function(err) {
        res.send(409, "Failed to create the image");
    };
    updateWithName(req,res,false, ok, err);
};

exports.defaultImage = function(req, res) {
    console.log("try to create new image by duplicating the default one");
    var issueNo = req.query.issueNo,
        featureName = req.query.featureName,
        pageNo = req.query.pageNo,
        channel = req.query.channel,
        imageName = req.query.imageName;
    var ok = function(docs) {
        res.redirect( "/tool/magazine/" );
        res.send( 200 );
    };
    var err = function(err) {
        res.send(409, "Failed to duplicate default image");
    };
    duplicateDefaultImage(issueNo, featureName, pageNo, channel, imageName, ok, err);
};
 
exports.removeById = function(req, res) {
    console.log("remove images by ID");
    var ok = function(doc) {
		fse.unlink(doc.imagepath, function (err) {
		  	if (err) throw err;
		  	console.log('successfully deleted' + doc.imagepath);
		});
        res.send(200);
    };
    var err = function(err) {
            res.send(409, "Failed to remove car");
    };
    images.removeById(req.params.id, ok, err);
};

function duplicateDefaultImage (issueNo, featureName, pageNo, channel, imageName, ok, err){
    var defaultImageName = imageName + ".jpg",
        defaultPath = "public/images/magazine/issue_template/default/common/" + defaultImageName;
        channelField = (channel =="global") ? "": channel;
    if(imageName == "productsBG"){
        var newfolderPath = "public/images/magazine/issue_"+issueNo+"/"+featureName+"/common/page_"+pageNo + channelField +"/";
    }
    else{
        var newfolderPath = "public/images/magazine/issue_"+issueNo+"/"+featureName+"/en/";
        
    }
    console.log("new folder path: "+newfolderPath);
    //create folder
    fse.mkdirs(newfolderPath, function(err) {
        if (err) return console.error(err);
        console.log("new folder path created success!");
    })
    var newImagePath = newfolderPath+defaultImageName;
    fse.copy(defaultPath, newImagePath, function(err) {
        if (err) {
            console.log("fail");
            return console.error(err);
        }
        console.log("copy file from: "+ defaultPath + " to "+ newImagePath +"success!");
        images.update(newImagePath,defaultImageName, ok, err);
    });
}

function updateWithName (req, res, withName, ok, err){
    req.pipe(req.busboy);
    req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      imagelocation = val;
      //still buggy, uncomment if need to create directory
      //fse.mkdir(imagelocation);
    });
    req.busboy.on('file', function (fieldname, file, filename) {
        if(withName){
            console.log('uploading files to : ' +'public'+ imagelocation + filename);
            var fstream = fse.createWriteStream('public'+ imagelocation + filename);
        }
        else{
            console.log('uploading files to : ' +'public'+ imagelocation);
            var fstream = fse.createWriteStream('public'+ imagelocation);
        }
        fstream.on('error', function(err) {
            console.log("ERROR:" + err);
            file.read();
        });
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log('uploading finishes save info : imagelocation - '+ imagelocation + ' filename -' + filename+'  to database ');
            images.update(imagelocation,filename, ok, err);
        });
    });
}