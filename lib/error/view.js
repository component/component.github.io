
/**
 * Module dependencies.
 */

var tmpl = require('./template')
  , reactive = require('reactive')
  , domify = require('domify')

/**
 * Expose `ErrorView`.
 */

module.exports = ErrorView;

/**
 * Initialize a new error view.
 *
 * @param {Object} error
 * @api public
 */

function ErrorView(error) {
  this.error = error;
  this.el = domify(tmpl);
  this.view = reactive(this.el, error, this);
}
