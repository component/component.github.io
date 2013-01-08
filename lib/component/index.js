
/**
 * Module dependencies.
 */

var express = require('express')
  , highlight = require('peacock').highlight
  , debug = require('debug')('component')
  , request = require('superagent')
  , markdown = require('marked')
  , mkdir = require('mkdirp')
  , fs = require('fs')

// app

var app = module.exports = express();

// settings

app.set('views', __dirname);

// markdown settings

markdown.setOptions({
  gfm: true,
  sanitize: true,
  highlight: function(code, lang){
    if ('js' === lang) {
      try {
        code = highlight(code, { linenos: false });
      } catch (e) {}
    }
    return code
  }
});

/**
 * GET :user's :repo :file from github.
 */

app.get('/:user/:repo/:file', exists(serve), fetch);

/**
 * Check if the component's
 * contents have been cached,
 * if so invoke `fn()` otherwise
 * next().
 */

function exists(fn) {
  return function(req, res, next){
    var user = req.params.user;
    var repo = req.params.repo;
    var file = req.params.file;
    req.tmp = '/tmp/components/' + user + '/' + repo;
    req.file = req.tmp + '/' + file;

    fs.exists(req.file, function(yes){
      if (yes) return fn(req, res, next);
      next();
    });
  }
}

/**
 * Serve the component data.
 */

function serve(req, res, next) {
  var file = req.file;
  debug('serve %s', file);
  res.sendfile(file);
}

/**
 * Fetch and serve the component data.
 */

function fetch(req, res, next) {
  var user = req.params.user;
  var repo = req.params.repo;
  var file = req.params.file;

  get(user, repo, file, function(err, buf){
    if (err) return next(err);
    mkdir(req.tmp, function(err){
      if (err) return next(err);

      debug('writing %s', req.file);
      if ('readme' == file) buf = markdown(buf.toString());
      fs.writeFile(req.file, buf, function(err){
        if (err) return next(err);
        serve(req, res, next);
      });
    });
  });
}

/**
 * GET `file` from `user`'s `repo`
 * and invoke `fn(null, buf)`.
 *
 * @param {String} user
 * @param {String} repo
 * @param {String} file
 * @param {Function} fn
 * @api private
 */

function get(user, repo, file, fn) {
  debug('fetch %s/%s %s', user, repo, file);
  var url = 'https://api.github.com/repos/' + user + '/' + repo + '/' + file;

  request
  .get(url)
  .end(function(err, res){
    debug('%s response', res.status);
    if (err) return fn(err);
    if (res.error) return fn(res.error);
    var buf = new Buffer(res.body.content, 'base64');
    fn(null, buf);
  });
}
