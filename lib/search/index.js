
/**
 * Module dependencies.
 */

var Component = require('component');
var domify = require('domify');
var Emitter = require('emitter');
var ErrorView = require('error');
var menu = require('menu');
var reactive = require('reactive');
var request = require('superagent');
var template = require('./index.html');

/**
 * Expose `Search`.
 */

module.exports = Search;

/**
 * Create a search results `Menu`.
 */

var Menu = menu(Component);

/**
 * Initialize a new `Search` view.
 *
 * @api public
 */

function Search() {
  this.el = domify(template);
  this.input = this.el.querySelector('input');
  this.view = reactive(this.el, {}, this);
  this.collapse();
}

/**
 * Mixin emitter.
 */

Emitter(Search.prototype);

/**
 * Replace menu.
 *
 * @return {Element}
 */

Search.prototype.replaceMenu = function () {
  var self = this;
  var menu = this.menu = new Menu();

  menu.on('select', function (el, model, view) {
    self.emit('select', model);
  });

  return menu.el;
};

/**
 * On typing in the search input.
 *
 * @param {Event} e
 */

Search.prototype.onInput = function(e){
  var self = this;
  var str = e.target.value;

  if (!str) return self.emit('search', '');
  if (str.length < 2) return;
  clearTimeout(this.timer);

  this.timer = setTimeout(function(){
    self.timer = null;
    self.search(str);
    self.emit('search', str);
    self.expand();
  }, 100);
};

/**
 * Clear the current search.
 *
 * @return {Search}
 */

Search.prototype.clear = function(){
  this.search('');
  return this;
};

/**
 * Focus the input.
 *
 * @return {Search}
 */

Search.prototype.focus = function(){
  this.input.focus();
  return this;
};

/**
 * Blur the input.
 *
 * @return {Search}
 */

Search.prototype.blur = function(){
  this.input.blur();
  return this;
};

/**
 * Expand the search results.
 *
 * @return {Search}
 */

Search.prototype.expand = function(){
  this.el.classList.add('expanded');
  this.menu.el.scrollTop = 0;
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
 * Search and display results for `query`.
 *
 * @param {String} [query]
 * @return {Search}
 */

Search.prototype.search = function(query){
  var self = this;
  var menu = this.menu;
  this.input.value = query;

  get(query, function(err, pkgs){
    if (!pkgs || !pkgs.length) return;
    menu.empty();
    pkgs.forEach(function(pkg){
      if (!pkg) return; // TODO: fix stupid trailing null
      pkg.id = pkg.repo;
      menu.add(pkg);
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
