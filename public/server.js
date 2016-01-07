var express = require('express');
var app 	= express();
var path    = require("path");	

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname+'/index.html'));
});

var server = app.listen(3000, function () {

  console.log('Example app listening 3000');
});
server.use(express.static(path.join(__dirname, 'static')));