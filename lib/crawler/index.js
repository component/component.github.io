
/**
 * Load all the components from the crawler.
 */

var request = require('superagent');

var loaded = false;
var loading = false;
var queue = [];

module.exports = crawler;

// automatically load all the crawled data on page load
crawler();

function crawler(done) {
  done = done || noop;
  if (loaded) return done();
  if (loading) return queue.push(done);
  loading = true;

  request
  .get('http://component-crawler.herokuapp.com/.json')
  .end(function (err, res) {
    crawler.users = res.body.users;
    crawler.components = res.body.components;

    loaded = true;
    loading = false;
    done();
    while (queue.length) queue.shift()();
  })
}

function noop(){}
