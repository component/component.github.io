
/**
 * Module dependencies.
 */

var Search = require('search')
  , Component = require('component')
  , page = require('page');

/**
 * Clear body on page change.
 */

page('*', function(ctx, next){
  document.body.innerHTML = '';
  next();
})

/**
 * Index page.
 */

page('/', function(){
  var search = new Search;
  document.body.appendChild(search.show());
})

/**
 * Component page.
 */

page('/:user/:repo', function(ctx){
  var user = ctx.params.user;
  var repo = ctx.params.repo;
  var view = new Component(user, repo);
  document.body.appendChild(view.show());
})

// route

page()
