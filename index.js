var express = require('express');
var app = express();

app.use('/src', express.static(__dirname + '/src'));

var num = [0];

app.get('/increment', function(req,res){
	num[0] = num[0]+1;
	res.send(num);
});

app.use('/', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000, function() {
	console.log('listening on *:3000');
});
