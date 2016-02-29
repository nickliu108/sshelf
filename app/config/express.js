var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/../../public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
app.use(busboy());

app.listen(3000, function(){
  console.log('Running tool on port 3000');
});

module.exports = app;
