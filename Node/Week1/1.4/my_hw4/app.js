var express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	assert = require('assert');
	MongoClient = require('mongodb').MongoClient,
	bodyParser = require('body-parser');


app.engine('html', consolidate.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect('mongodb://localhost:27017/videos',function(err,db){

	assert.equal(null,err);
	console.log("Successfuly connected to My MongoDB.");

	app.get('/',function(req,res){
		res.render('hello',{'name':'Minal'});
	});

	app.get('/movies',function(req,res){
		res.render('add_movie',{});
	});

	app.post('/add_movie', function(req,res){
		var title = req.body.title;
		var year = req.body.year;
		var imdb = req.body.imdb;

		if((title == '') || (year == '') || (imdb == '')){
			console.log('Error');
		}else{
			db.collection('movies').insertOne(
				{'title':title,'year':year,'imdb':imdb}
			);
		} 

	});

	app.use(function(req,res){
		res.sendStatus(404);
	});

	var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log('Express server listening on port %s.' , port);
	});

});

