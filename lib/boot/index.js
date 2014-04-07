
/**
 * Module dependencies.
 */

var Search = require('search');
var page = require('page.js');
var top = require('top');
var k = require('k')(window);

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

// route

page()
