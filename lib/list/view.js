
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
  this.el = domify(tmpl);
  this.view = reactive(this.el, pkg, this);
  pkg.user = (pkg.repo || '').split('/')[0];
}

/**
 * Description.
 */

ComponentView.prototype.description = function(){
  return this.pkg.description || 'No description';
};

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

/**
 * Repo link.
 */

ComponentView.prototype.repoLink = function(){
  return '/' + this.pkg.repo;
};
