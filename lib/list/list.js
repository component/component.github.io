
/**
 * Module dependencies.
 */

var ComponentView = require('./view')
  , ErrorView = require("./error");

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

/**
 * Show error message.
 *
 * @param {String} title
 * @param {String} msg
 * @api public
 */

List.prototype.error = function(title, msg){
  var view = new ErrorView({ title: title, msg: msg });
  this.clear();
  this.el.appendChild(view.el);
};
