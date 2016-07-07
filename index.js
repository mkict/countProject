var express = require('express');
var app = express();

app.use('/src', express.static(__dirname + '/src'));

app.use('/', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000, function() {
	console.log('listening on *:3000');
});
