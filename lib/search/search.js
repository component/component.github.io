
/**
 * Module dependencies.
 */

var List = require('list')
  , ErrorView = require('error')
  , request = require('superagent')
  , reactive = require('reactive')
  , domify = require('domify')
  , tmpl = require('./template')

/**
 * Expose `SearchView`.
 */

module.exports = SearchView;

/**
 * Initialize a new SearchView view.
 *
 * @api public
 */

function SearchView() {
  this.el = domify(tmpl)[0];
  this.view = reactive(this.el, {}, this);
  this.list = new List;
  this.el.appendChild(this.list.el);
}

/**
 * Handle input.
 */

SearchView.prototype.search = function(e){
  var self = this;
  var str = e.target.value;

  if (!str) return self.show();
  if (str.length < 2) return;
  clearTimeout(this.timer);

  this.timer = setTimeout(function(){
    self.timer = null;
    self.show(e.target.value);
  }, 400);
};

/**
 * Search and display results for `query`.
 *
 * @param {String} [query]
 * @return {Element}
 * @api public
 */

SearchView.prototype.show = function(query){
  var self = this;
  var list = this.list;

  list.clear();
  get(query, function(err, pkgs){
    // TODO: handle error
    if (!pkgs || !pkgs.length) {
      self.error('No results', "Sorry, no results for that query! Try again!");
      return;
    }

    pkgs.forEach(function(pkg){
      if (!pkg) return; // TODO: fix stupid trailing null
      list.add(pkg);
    });
  });

  return this.el;
};

/**
 * Display error `title` with `msg`.
 *
 * @param {String} title
 * @param {String} msg
 * @api private
 */

SearchView.prototype.error = function(title, msg){
  var view = new ErrorView({ title: title, msg: msg });
  this.list.clear();
  this.list.el.appendChild(view.el);
};

/**
 * Fetch components and invoke `fn(err, pkgs)`
 * with optional search `query`.
 *
 * @param {String} [query]
 * @param {Function} fn
 * @api private
 */

function get(query, fn) {
  var url = 'http://component.io/components';

  if (query) {
    url += '/search/' + encodeURIComponent(query);
  } else {
    url += '/all';
  }

  request
  .get(url)
  .end(function(res){
    fn(res.error, res.body);
  });
}
