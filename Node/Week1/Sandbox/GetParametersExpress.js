/**
 * Created by Ali on 2016-11-06.
 */

var express = require('express'),
    app = express(),
    consolidate = require('consolidate');

app.engine('html',consolidate.nunjucks);

app.set('view engine', 'html');
app.set('views' + __dirname + '/views');

app.get('/',function (req, res) {
    res.send('Hello Ali Bhagat');
});

app.get('/:firstName/:lastName',function (req,res) {
    var fname = req.params.firstName;
    var lname = req.params.lastName;
    var firstPar = req.query.param;

    res.render('get',{'fname': fname, 'lname' : lname, 'firstPar' : firstPar});
});

var server = app.listen(3010,function () {
    var port = server.address().port;
    console.log('Listening on port %s.', port);
});
