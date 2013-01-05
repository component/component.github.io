
/**
 * Module dependencies.
 */

var Builder = require('component-builder')
  , reworkPlugin = require('./rework')
  , fs = require('fs')
  , write = fs.writeFileSync

/**
 * Component builder middleware.
 */

module.exports = function(req, res, next){
  var builder = new Builder('.');
  builder.addLookup('lib');
  builder.use(reworkPlugin);
  builder.build(function(err, res){
    if (err) return next(err);
    write('public/build.js', res.require + res.js);
    write('public/build.css', res.css);
    next();
  });
};
