
/**
 * Module dependencies.
 */

var List = require('list')
  , ErrorView = require('error')
  , request = require('superagent')
  , reactive = require('reactive')
  , Spinner = require('spinner')
  , Emitter = require('emitter')
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
  this.el = domify(tmpl);
  this.view = reactive(this.el, {}, this);
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
  var str = e.target.value;

  if (!str) return self.emit('query', '');
  if (str.length < 2) return;
  clearTimeout(this.timer);

  this.timer = setTimeout(function(){
    self.timer = null;
    self.emit('query', e.target.value);
  }, 300);
};

/**
 * Add spinner.
 *
 * @api private
 */

SearchView.prototype.addSpinner = function(){
  var el = el || document.getElementById(this.spinner.el.id);
  if(!el){
    this.el.appendChild(this.spinner.el);
  }else {
    this.spinner.el.style.display = "block";
  }
};

/**
 * Remove spinner.
 *
 * @api private
 */

SearchView.prototype.removeSpinner = function(){
  this.spinner.el.style.display = "none";
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
