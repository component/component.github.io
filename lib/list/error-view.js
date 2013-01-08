
/**
 * Module dependencies.
 */

var tmpl = require('./error-template')
  , reactive = require('reactive')
  , domify = require('domify')
  , type = require('type')

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
  this.el = domify(tmpl)[0];
  this.view = reactive(this.el, error, this);
}
