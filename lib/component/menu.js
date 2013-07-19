
/**
 * Module dependencies.
 */

var domify = require('domify')
  , each = require('each')
  , slug = require('slug');

/**
 * Generate a menu for headings found within `pkg`.
 *
 * @param {Component} pkg
 * @return {Element} ul
 * @api private
 */

module.exports = function(pkg){
  var el = pkg.el;
  var ul = document.createElement('ul');
  ul.id = 'toc';

  var url = 'https://github.com/' + pkg.user + '/' + pkg.repo;
  ul.appendChild(domify('<li><a href="' + url + '">GitHub Repo</a></li>'));

  var headings = el.querySelectorAll('h2, h3');

  each(headings, function(el){
    var level = el.nodeName.toLowerCase();

    // slug
    var text = el.textContent;
    var id = slug(text);
    el.id = id;

    // item
    var li = document.createElement('li');
    li.className = level;

    // link
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = removeParams(text);

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
};

/**
 * Remove parameters from function signatures.
 */

function removeParams(str) {
  return str.replace(/\(.*?\)/, '()');
}
