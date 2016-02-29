var monk = require('monk');
var db = monk('localhost:27017/dbtest');

var app = require('./config/express');
var magTool = require('./routes/magazine/index');

// var images = require('./routes/images/index');
// var magToolUtility = require('./routes/utility/index');
// var testpage = require('./routes/test/index');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

magTool.magazineRoute(app);

// app.use('/images/',images);
// app.use('/tool/debug',magToolUtility);
// app.use('/tool/test',testpage);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
