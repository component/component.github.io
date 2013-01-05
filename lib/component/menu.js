
/**
 * Module dependencies.
 */

var each = require('each')
  , slug = require('slug');

/**
 * Generate a menu for headings found within `el`.
 *
 * @param {Element} el
 * @return {Element} ul
 * @api private
 */

module.exports = function(el){
  var ul = document.createElement('ul');
  ul.id = 'toc';

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
    a.textContent = text;

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
};
