
/**
 * Module dependencies.
 */

var Search = require('search');
var top = require('top');
var k = require('k')(window);
var qs = require('querystring');


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
 * Content element.
 */

var content = document.querySelector('#content');

/**
 * Handle queries.
 */

search.on('query', function(str){
  content.className = 'index';
  search.show(str);
});

var initialQuery = qs.parse(location.search).q;
if (!initialQuery || initialQuery.length < 2) {
  initialQuery = '';
}
search.input(initialQuery);
search.focus();
search.search();
