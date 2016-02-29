var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', config.ROOT + '/app/views');
app.set('view engine', 'jade');

app.use(favicon(config.ROOT + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
app.use(busboy());

app.use(function(req, res, next){
  console.log('originalUrl: ', req.originalUrl);
  console.log('hostname: ', req.hostname);
  console.log('baseUrl: ', req.baseUrl);
  console.log('path: ', req.path);
  next();
});

app.listen(config.PORT, function(){
  console.log('Running tool on port '+ config.PORT);
});

module.exports = app;
