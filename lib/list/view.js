
/**
 * Module dependencies.
 */

var reactive = require('reactive');

var tmpl = require('domify')(require('./template'));

/**
 * Expose `ComponentView`.
 */

module.exports = ComponentView;

/**
 * Initialize a new component view.
 *
 * @param {Object} pkg
 * @api public
 */

function ComponentView(pkg) {
  this.pkg = pkg;
  this.el = tmpl.cloneNode(true);
  this.view = reactive(this.el, pkg, {
    delegate: this
  });
}

ComponentView.prototype = {
  get repository() {
    return this.pkg.repo
      || this.pkg.repository
      || '';
  },

  get description() {
    return this.pkg.description || 'No description.';
  },

  get url() {
    return 'https://github.com/' + this.repository;
  },

  get license() {
    return this.pkg.license || 'None';
  },

  get stars() {
    return this.pkg.stars || 0;
  }
}
