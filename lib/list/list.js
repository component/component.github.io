
/**
 * Module dependencies.
 */

var ComponentView = require('./view');

/**
 * Expose `List`.
 */

module.exports = List;

/**
 * Initialize a component listing.
 *
 * @param {String} [query]
 * @api public
 */

function List() {
  this.el = document.createElement('div');
  this.el.className = 'components';
}

/**
 * Clear the list.
 *
 * @api public
 */

List.prototype.clear = function(){
  this.el.innerHTML = '';
};

/**
 * Add `pkg` to the listing.
 *
 * @param {Object} pkg
 * @api public
 */

List.prototype.add = function(pkg){
  var view = new ComponentView(pkg);
  this.el.appendChild(view.el);
};

