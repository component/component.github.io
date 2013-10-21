
/**
 * Module dependencies.
 */

var Component = require('component');
var k = require('k')(window);
var Router = require('router');
var Search = require('search');

/**
 * Analytics.
 */

require('ga')('UA-38709036-1');

/**
 * Content element.
 */

var content = document.querySelector('#content');

/**
 * Router.
 */

var router = new Router()
  .on('/', clear, home)
  .on('/search/:query', clear, home, query) // only triggered by direct link
  .on('/:user/:repo', clear, component);

/**
 * Global search.
 */

var search = new Search();
document.body.appendChild(search.el);

search.on('query', function(str){
  var path = str ? '/search/' + str : '/';
  router.replace(path);
});


/**
 * Search shortcuts.
 */

k('s', function(e){
  if (document.body != e.target) return;
  e.preventDefault();
  search.focus();
});

k('esc', function(e){
  e.preventDefault();
  search.collapse();
  search.blur();
});

/**
 * Start routing.
 */

router.start();

/**
 * Clear body on page change.
 */

function clear(ctx, next){
  content.innerHTML = '';
  search.collapse();
  next();
}

/**
 * Index page.
 */

function home(ctx, next){
  content.className = 'index';
  // TODO: write home page content
  next();
}

/**
 * Search query.
 */

function query(ctx, next){
  var q = ctx.params.query;
  search.search(q);
  search.expand();
  next();
}

/**
 * Component page.
 */

function component(ctx, next){
  var user = ctx.params.user;
  var repo = ctx.params.repo;
  var view = new Component(user, repo);
  content.className = 'component-page';
  content.appendChild(view.show());
  next();
}