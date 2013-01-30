#!/usr/bin/env NODE_PATH=./lib node

/**
 * Module dependencies.
 */

var program = require('commander')
  , app = require('..')

// options

program
  .option('-p, --port <n>', 'set port number [3000]', parseInt)
  .parse(process.argv);

// listen

var port = program.port || 3000;
app.listen(port);
console.log('application listening on port %d', port);
