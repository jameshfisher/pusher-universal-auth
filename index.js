var express = require('express');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;

  var pusher = new Pusher({
    appId: req.body.authWithAppId,
    key: req.body.authWithAppKey,
    secret: req.body.authWithAppSecret,
  });

  var presenceData = req.body.authWithPresenceData;

  var auth = presenceData ?
    pusher.authenticate(socketId, channel, JSON.parse(presenceData)) :
    pusher.authenticate(socketId, channel);

  res.send(auth);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
