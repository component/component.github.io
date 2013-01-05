
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();

// settings

app.set('views', __dirname);

/**
 * GET index page.
 */

app.get('/', function(req, res){
  res.render('index');
});
