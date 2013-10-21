
/**
 * Module dependencies.
 */

var domify = require('domify');
var reactive = require('reactive');
var template = require('./index.html');
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

function Item(pkg){
  this.pkg = pkg;
  this.el = domify(template);
  this.view = reactive(this.el, pkg, this);
  pkg.user = (pkg.repo || '').split('/')[0];
}

/**
 * Description.
 */

Item.prototype.description = function(){
  return this.pkg.description || 'No description.';
};

/**
 * URL.
 */

Item.prototype.url = function(){
  return 'https://github.com/' + this.pkg.repo;
};

/**
 * License.
 */

Item.prototype.license = function(){
  return this.pkg.license || 'None';
};

/**
 * Repo URL.
 */

Item.prototype.repoUrl = function(){
  return '/' + this.pkg.repo;
};
