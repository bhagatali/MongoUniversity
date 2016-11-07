/**
 * Created by Ali on 2016-11-06.
 */
var express = require('express'),
    app = express(), //Web framework to handle routing requests
    consolidate = require('consolidate'), //Templating library adapter for Express
    assert = require('assert'),
    MongoClient = require('mongodb').MongoClient;

app.engine('html',consolidate.nunjucks);

app.set('view engine','html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/crunch', function (err,db) {

    assert.equal(null,err);
    console.log('Connected to the Crunch DB');

    app.get('/', function (req,res) {
        db.collection('companies').find({}).toArray(function (err,db) {
            assert.equal(null,err);
            console.log('Picking from Companies collections...');
            res.render('companies',{'companies':db});
        });
    });

    app.use(function (req,res) {
        res.sendStatus(404);
    });

    var server = app.listen(3003,function(){
        var port = server.address().port;
        console.log('Express server is listening on port %s', port);
    });

});

