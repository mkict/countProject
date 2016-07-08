"use strict";

var externalip = require('external-ip');
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

console.log('Establishing connection to MongoDB....');
MongoClient.connect('mongodb://localhost:27017/view',(err,database) => {
	if(err) {
		console.log('Connection to MongoDB: failed');
		return;
	}
	db = database;
	console.log('Connection to MongoDB: success');
	app.listen(3000,() => console.log('listening to *:3000'));
});

app.use('/src', express.static(__dirname + '/src'));
app.get('/visit',(req,res) => {
	// var ipv4,ipv6;
	var getIP = externalip();
	res.set('Content-Type','text/plain');
	getIP((err,ip) => {
		db.collection('data').insertOne({
			'viewDate': new Date(),
			'viewIP': ip
		});
		db.collection('data').update({'_id':0},{$inc:{'views':1}});
		db.collection('data').find({'_id': 0},(err,count) => {
			count.toArray((err,doc) => res.send(doc[0]['views'].toString()));
		});
	});
});
app.use('/',(req, res) => res.sendFile(__dirname + '/src/index.html'));
