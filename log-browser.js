// Get the packages we need
var express = require('express');

// initialize the server
var app = express();
var port = process.argv[2] || 1065;

app.use(express.static('public'));

app.listen(port);
console.log('listening on *:' + port);