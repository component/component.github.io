
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
 * Fetch components and invoke `fn(err, pkgs)`
 * with optional search `query`.
 *
 * @param {String} [query]
 * @param {Function} fn
 * @api public
 */

List.prototype.get = function(query, fn){
  var url = 'http://component.io/components';

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
 * Load packages and display
 * with optional `query`.
 *
 * @param {String} [query]
 * @api public
 */

List.prototype.show = function(query){
  var self = this;
  this.get(query, function(err, pkgs){
    pkgs.forEach(function(pkg){
      if (!pkg) return; // TODO: fix stupid trailing null
      self.add(pkg);
    });
  });
};
