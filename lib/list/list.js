
/**
 * Module dependencies.
 */

var request = require('superagent');

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
