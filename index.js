
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

// settings

app.set('view engine', 'jade');

// middleware

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static('public'));

// mount

app.use(require('boot'));

// listen

app.listen(3000);
console.log('listening on port 3000');
