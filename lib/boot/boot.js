
/**
 * Module dependencies.
 */

var Search = require('search')
  , Component = require('component')
  , page = require('page')
  , top = require('top')

// back to top

top();

/**
 * Content element.
 */

var content = document.querySelector('#content');

/**
 * Clear body on page change.
 */

page('*', function(ctx, next){
  content.innerHTML = '';
  next();
})

/**
 * Index page.
 */

page('/', function(){
  var search = new Search;
  content.className = 'index';
  content.appendChild(search.show());
})

/**
 * Component page.
 */

page('/:user/:repo', function(ctx){
  var user = ctx.params.user;
  var repo = ctx.params.repo;
  var view = new Component(user, repo);
  content.className = 'component-page';
  content.appendChild(view.show());
})

// route

page()
