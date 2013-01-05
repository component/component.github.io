
/**
 * Module dependencies.
 */

var tmpl = require('./template')
  , domify = require('domify');

/**
 * Expose `ComponentView`.
 */

module.exports = ComponentView;

/**
 * Initialize a new component view.
 *
 * @param {Object} pkg
 * @api public
 */

function ComponentView(pkg) {
  this.pkg = pkg;
  this.el = domify(tmpl)[0];
}
