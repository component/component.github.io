
/**
 * Module dependencies.
 */

var List = require('list');
var ErrorView = require('error');
var reactive = require('reactive');
var Spinner = require('spinner');
var Emitter = require('emitter');
var domify = require('domify');
var tmpl = require('./template');
var search = require('search.js');

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
  this.el = domify(tmpl);
  this.view = reactive(this.el, {}, {
    delegate: this
  });
  this.list = new List;
  this.el.appendChild(this.list.el);
  this.spinner = new Spinner;
  this.spinner.el.id = 'spinner';
  this.spinner.size(25);
}

/**
 * Mixin emitter.
 */

Emitter(SearchView.prototype);

/**
 * Set the value of the input.
 *
 * @api public
 */

SearchView.prototype.input = function(query){
  this.el.querySelector('input').value = query;
};

/**
 * Focus on the input.
 *
 * @api public
 */

SearchView.prototype.focus = function(){
  this.el.querySelector('input').focus();
};

/**
 * Handle input.
 */

SearchView.prototype.search = function(e){
  var self = this;
  var targetEl = (e && e.target) || this.el.querySelector('input');
  var str = targetEl.value;

  if (!str) return self.emit('query', '');
  if (str.length < 2) return;
  clearTimeout(this.timer);

  this.timer = setTimeout(function(){
    self.timer = null;
    self.emit('query', str);
    analytics.track('query', {
      query: str
    });
  }, 100);
};

/**
 * Add spinner.
 *
 * @api private
 */

SearchView.prototype.addSpinner = function(){
  this.el.appendChild(this.spinner.el);
};

/**
 * Remove spinner.
 *
 * @api private
 */

SearchView.prototype.removeSpinner = function(){
  var el = this.spinner.el;
  if (el.parentNode) el.parentNode.removeChild(el);
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
  this.addSpinner();
  get(query, function(err, pkgs){
    self.removeSpinner();

    // TODO: handle error
    if (!pkgs || !pkgs.length) {
      self.error('No results', "Sorry, no results for that query! Try again!");
      return;
    }

    pkgs.forEach(list.add, list);
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
  search.crawler(function (err) {
    if (err) return fn(err);
    fn(null, search(query));
  });
}
