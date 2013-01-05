
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

// middleware

app.use(express.logger('dev'));

// mount

app.use(require('./lib/main'));

// listen

app.listen(3000);
console.log('listening on port 3000');
