
/**
 * Module dependencies.
 */

var Search = require('search')
  , Component = require('component')
  , page = require('page')
  , top = require('top')
  , k = require('k')(window)

// back to top

top();

// search shortcut

k('s', function(e){
  if ('BODY' != e.target.nodeName) return;
  e.preventDefault();
  search.focus();
});

/**
 * Search.
 */

var search = new Search;
document.body.appendChild(search.el);

/**
 * Handle queries.
 */

search.on('query', function(str){
  if ('' == str) {
    page('/');
  } else {
    page('/search/' + encodeURIComponent(str));
  }
});

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
  content.className = 'index';
  search.show();
})

/**
 * Search query.
 */

page('/search/:query', function(ctx){
  var query = ctx.params.query;
  content.className = 'index';
  search.show(query);
});

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
