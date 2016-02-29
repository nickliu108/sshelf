'use strict';

var consoleLogger = {
  log: function(req, res, next){
    var logMessege = {
      'originalUrl': req.originalUrl,
      'hostname': req.hostname,
      'baseUrl': req.baseUrl,
      'path': req.path,
    };
    console.log(logMessege);
    next();
  }
};

module.exports = consoleLogger.log;
