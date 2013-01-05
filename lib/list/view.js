
/**
 * Module dependencies.
 */

var tmpl = require('./template')
  , reactive = require('reactive')
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
  pkg.user = (pkg.repo || '').split('/')[0];
  this.pkg = pkg;
  this.el = domify(tmpl)[0];
  this.view = reactive(this.el, pkg, this);
}

/**
 * Github url.
 */

ComponentView.prototype.url = function(){
  return 'http://github.com/' + this.pkg.repo;
};
