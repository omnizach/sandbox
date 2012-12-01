var express = require('express'),
    path = require('path'),
    http = require('http'),
    fs = require('fs'),
    util = require('util');;
    
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3004);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
    res.send('Hi there.');
});

app.get('/bottles', function(req, res) {
    res.sendfile('public/counter.html');
});

app.get('/salsa', function(req, res) {
    // http://freemusicarchive.org/
    var mp3File = __dirname + "/SONGO_21_-_05_-_De_Cuba.mp3";
    var stat = fs.statSync(mp3File); // we need some info about the file size

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(mp3File);
    // instead of events we'll make a single call to a helper function
    util.pump(readStream, res);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});