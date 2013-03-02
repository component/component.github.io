
/**
 * Module dependencies.
 */

var tmpl = require('./template')
  , reactive = require('reactive')
  , domify = require('domify')
  , type = require('type')

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
  this.view = reactive(this.el, pkg, this);
  pkg.user = (pkg.repo || '').split('/')[0];
}

/**
 * Github url.
 */

ComponentView.prototype.url = function(){
  return 'http://github.com/' + this.pkg.repo;
};

/**
 * License.
 */

ComponentView.prototype.license = function(){
  return this.pkg.license || 'none';
};