var express = require('express'),
    app = express();

app.get('/',function (req, res) {
    res.send('Hello Ali Bhagat');
});

app.use(function (req,res) {
    res.sendStatus(404);
})

var server = app.listen(3000,function () {
    var port = server.address().port;
    console.log('Express server on port %s is up and running .....', port);
})