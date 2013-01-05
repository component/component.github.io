
/**
 * Module dependencies.
 */

var request = require('superagent')
  , ComponentView = require('./view');

/**
 * Expose `List`.
 */

module.exports = List;

/**
 * Initialize a component listing
 * with optional search `query`.
 *
 * @param {String} [query]
 * @api public
 */

function List(query) {
  this.el = document.createElement('ul');
  this.query = query;
}

/**
 * Fetch components and invoke `fn(err, pkgs)`.
 *
 * @param {Function} fn
 * @api public
 */

List.prototype.get = function(fn){
  var url = 'http://component.io/components';
  var query = this.query;

  if (query) {
    url += '/search/' + encodeURIComponent(query);
  } else {
    url += '/all';
  }

  request
  .get(url)
  .end(function(res){
    if (res.error) return fn(res.error);
    fn(null, res.body);
  });
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
 * Load packages and display.
 *
 * @api public
 */

List.prototype.load = function(){
  var self = this;
  this.get(function(err, pkgs){
    pkgs.forEach(function(pkg){
      self.add(pkg);
    });
  });
};
