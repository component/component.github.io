
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();

// settings

app.set('view engine', 'jade');

// middleware

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

// mount

app.use(require('component'));
app.use(require('boot'));
