
/**
 * Module dependencies.
 */

var request = require('superagent')
  , menu = require('./menu')

/**
 * Hash reference.
 */

var hash = location.hash;

/**
 * Expose `ComponentView`.
 */

module.exports = ComponentView;

/**
 * Initialize a `ComponentView` with
 * the `user` and project `repo` names.
 *
 * @param {String} user
 * @param {String} repo
 * @api public
 */

function ComponentView(user, repo) {
  this.user = user;
  this.repo = repo;
  this.el = document.createElement('div');
}

/**
 * Display the readme.
 *
 * @api private
 */

ComponentView.prototype.showReadme = function(){
  var self = this;
  this.get('readme', function(err, str){
    self.el.innerHTML = str;
    self.menu = menu(self);
    self.el.appendChild(self.menu);
    if (hash) location.hash = hash;
  });
};

/**
 * Show the view.
 *
 * @return {Element}
 * @api public
 */

ComponentView.prototype.show = function(){
  this.showReadme();
  return this.el;
};

/**
 * GET `file` and invoke `fn(null, str)`.
 *
 * @param {String} file
 * @param {Function} fn
 * @api private
 */

ComponentView.prototype.get = function(file, fn){
  var url = '/' + this.user + '/' + this.repo + '/' + file;

  request
  .get(url)
  .end(function(res){
    if (res.error) return fn(res.error);
    fn(null, res.text);
  });
};
