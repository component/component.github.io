
/**
 * Module dependencies.
 */

var rework = require('rework')
  , mixins = require('rework-mixins')
  , whitespace = require('css-whitespace')
  , props = require('./props')
  , path = require('path')
  , fs = require('fs')
  , read = fs.readFileSync

/**
 * Vendors supported.
 */

var vendors = ['-ms-', '-moz-', '-webkit-'];

/**
 * Rework css plugin.
 *
 * @param {Builder} builder
 * @api public
 */

module.exports = function(builder){
  builder.hook('before styles', function(pkg){
    var styles = pkg.conf.styles;
    if (!styles) return;

    for (var i = 0; i < styles.length; i++) {
      var file = styles[i];
      var ext = path.extname(file);
      if ('.styl' != ext) return;

      var css = compile(read(pkg.path(file), 'utf8').replace(/\r/g, ''));
      var newFile = path.basename(file, '.styl') + '.css';
      pkg.addFile('styles', newFile, css);
      pkg.removeFile('styles', file);
      --i;
    }
  });
};

/**
 * Compile `css`.
 */

function compile(css) {
  css = whitespace(css);
  return rework(css)
    .vendors(vendors)
    .use(rework.colors())
    .use(rework.references())
    .use(rework.keyframes())
    .use(rework.ease())
    .use(rework.prefixValue('transform'))
    .use(rework.prefix(props))
    .use(rework.mixin(mixins))
    .use(rework.at2x())
    .toString();
}
