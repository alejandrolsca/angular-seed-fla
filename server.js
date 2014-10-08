var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});