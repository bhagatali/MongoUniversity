/**
 * Created by Ali on 2016-11-06.
 */

var express = require('express'),
    app = express(),
    consolidate = require('consolidate');

app.engine('html',consolidate.nunjucks);

app.set('view engine','html');
app.set('views', __dirname + '/views');

app.get('/', function (req,res) {
    res.render('basic',{'name':'Ali Asgar Shabbir Bhagat'});
});

app.use(function (req, res){
    res.sendStatus(404);
});

var server = app.listen(3001,function(req,res){
   var port = server.address().port;
    console.log('Express server on port %s is up and running, man!!!', port);
});
