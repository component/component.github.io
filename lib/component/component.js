
/**
 * Module dependencies.
 */

var request = require('superagent')
  , md = require('marked');

module.exports = ComponentView;

function ComponentView(user, repo) {
  this.user = user;
  this.repo = repo;
  this.el = document.createElement('div');
}

ComponentView.prototype.showReadme = function(){
  var self = this;
  this.get('readme', function(err, str){
    self.el.innerHTML = md(str);
  });
};

ComponentView.prototype.show = function(){
  this.showReadme();
  return this.el;
};

ComponentView.prototype.get = function(file, fn){
  var url = '/' + this.user + '/' + this.repo + '/' + file;

  request
  .get(url)
  .end(function(res){
    if (res.error) return fn(res.error);
    fn(null, res.text);
  });
};
