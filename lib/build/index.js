
/**
 * Module dependencies.
 */

var Builder = require('component-builder')
  , rework = require('./rework')
  , fs = require('fs')
  , write = fs.writeFileSync

/**
 * Component builder middleware.
 */

module.exports = function(req, res, next){
  var start = new Date();
  var builder = new Builder('.');
  builder.copyAssetsTo('public');
  builder.use(rework);
  builder.build(function(err, res){
    if (err) return next(err);
    write('public/app.js', res.require + res.js);
    write('public/app.css', res.css);
    console.log('built in %sms', new Date - start);
    next();
  });
};
