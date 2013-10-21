
/**
 * Module dependencies.
 */

var tmpl = require('./item.html');
var reactive = require('reactive');
var domify = require('domify');
var type = require('type');

/**
 * Expose `Item`.
 */

module.exports = Item;

/**
 * Initialize a new search `Item` view.
 *
 * @param {Object} pkg
 * @api public
 */

function Item(pkg) {
  this.pkg = pkg;
  this.el = domify(tmpl);
  this.view = reactive(this.el, pkg, this);
  pkg.user = (pkg.repo || '').split('/')[0];
}

/**
 * Description.
 */

Item.prototype.description = function(){
  return this.pkg.description || 'No description';
};

/**
 * Github url.
 */

Item.prototype.url = function(){
  return 'http://github.com/' + this.pkg.repo;
};

/**
 * License.
 */

Item.prototype.license = function(){
  return this.pkg.license || 'none';
};

/**
 * Repo link.
 */

Item.prototype.repoLink = function(){
  return '/' + this.pkg.repo;
};
