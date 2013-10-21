
/**
 * Module dependencies.
 */

var Builder = require('component-builder');
var fs = require('fs');
var path = require('path');
var pure = require('rework-pure-css');
var read = fs.readFileSync;
var rework = require('rework');
var whitespace = require('css-whitespace');
var write = fs.writeFileSync;

/**
 * Component builder middleware.
 */

module.exports = function(req, res, next){
  var start = new Date;
  var builder = new Builder('.');
  builder.copyAssetsTo('public');
  builder.hook('before styles', styl);
  builder.build(function(err, res){
    if (err) return next(err);
    write('public/app.js', res.require + res.js);
    write('public/app.css', work(res.css));
    console.log('built in %sms', new Date - start);
    next();
  });
};

/**
 * Transform stylus.
 */

function styl(pkg){
  var styles = pkg.config.styles;
  if (!styles) return;

  for (var i = 0; i < styles.length; i++) {
    var file = styles[i];
    var ext = path.extname(file);
    if ('.styl' != ext) return;

    var css = whitespace(read(pkg.path(file), 'utf8').replace(/\r/g, ''));
    var newFile = path.basename(file, '.styl') + '.css';
    pkg.addFile('styles', newFile, css);
    pkg.removeFile('styles', file);
    --i;
  }
}

/**
 * Rework css.
 */

function work(css) {
  console.log(css);
  return rework(css)
    .use(pure)
    .use(rework.at2x())
    .toString();
}
