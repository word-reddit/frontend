var express = require('express');
var path = require('path');
var app = express();
var port = 80;

var publicPath = path.resolve(__dirname, 'www');
app.use(express.static('www'));

app.get('/', function(req, res){
	res.sendFile('index.html', {root: publicPath});
});

var server = app.listen(port, function () {
  console.log('Word Reddit Frontend serving at : ' + port);
});