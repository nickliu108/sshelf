'use strict';

var app = require('./config/express');
var magTool = require('./routes/magazine/index');

magTool.magazineRoute(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
