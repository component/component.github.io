
/**
 * Module dependencies.
 */

var domify = require('domify');
var Emitter = require('emitter');
var ErrorView = require('error');
var Item = require('./item');
var list = require('list');
var reactive = require('reactive');
var request = require('superagent');
var Spinner = require('spinner');
var template = require('./index.html');

/**
 * Expose `Search`.
 */

module.exports = Search;

/**
 * Create a search results `List`.
 */

var List = list(Item);

/**
 * Initialize a new `Search` view.
 *
 * @api public
 */

function Search() {
  this.el = domify(template);
  this.view = reactive(this.el, {}, this);
  this.collapse();

  this.spinner = new Spinner();
  this.spinner.el.id = 'spinner';
  this.spinner.size(25);
}

/**
 * Mixin emitter.
 */

Emitter(Search.prototype);

/**
 * Replace list.
 *
 * @return {Element}
 */

Search.prototype.replaceList = function () {
  this.list = new List();
  return this.list.el;
};

/**
 * On typing in the search input.
 *
 * @param {Event} e
 */

Search.prototype.onInput = function(e){
  var self = this;
  var str = e.target.value;

  if (!str) return self.emit('query', '');
  if (str.length < 2) return;
  clearTimeout(this.timer);

  this.timer = setTimeout(function(){
    self.timer = null;
    self.emit('query', e.target.value);
    self.expand();
  }, 100);
};

/**
 * Focus the input.
 *
 * @return {Search}
 */

Search.prototype.focus = function(){
  this.el.querySelector('input').focus();
  return this;
};

/**
 * Blur the input.
 *
 * @return {Search}
 */

Search.prototype.blur = function(){
  this.el.querySelector('input').blur();
  return this;
};

/**
 * Expand the search results.
 *
 * @return {Search}
 */

Search.prototype.expand = function(){
  this.el.classList.add('expanded');
  return this;
};

/**
 * Collapse the search results.
 *
 * @return {Search}
 */

Search.prototype.collapse = function(){
  this.el.classList.remove('expanded');
  return this;
};

/**
 * Add spinner.
 *
 * @api private
 */

Search.prototype.addSpinner = function(){
  this.el.appendChild(this.spinner.el);
};

/**
 * Remove spinner.
 *
 * @api private
 */

Search.prototype.removeSpinner = function(){
  this.el.removeChild(this.spinner.el);
};

/**
 * Search and display results for `query`.
 *
 * @param {String} [query]
 * @return {Search}
 */

Search.prototype.search = function(query){
  var self = this;
  var list = this.list;

  list.empty();
  this.addSpinner();
  get(query, function(err, pkgs){
    self.removeSpinner();
    if (!pkgs || !pkgs.length) return;

    pkgs.forEach(function(pkg){
      if (!pkg) return; // TODO: fix stupid trailing null
      list.add(pkg);
    });
  });

  return this;
};

/**
 * Fetch components and invoke `fn(err, pkgs)` with optional search `query`.
 *
 * @param {String} [query]
 * @param {Function} fn
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
