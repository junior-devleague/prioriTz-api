var restify = require('restify');
var mongoose = require('mongoose');
var item = require('./item.js');

// Connect to the database
mongoose.connect('mongodb://prioriTz:PeopleAndData2016@ds015915.mlab.com:15915/prioritz');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected');
});

// function respond(req, res, next) {
//   res.send('hello ' + req.params.name);
//   next();
// }

var server = restify.createServer({
	name: 'prioriTzAPI'
});
// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
  item.debug();
});


function send(req, res, next) {
  res.send('hello ' + req.params.name);
  return next();
}

server.post('/hello', function create(req, res, next) {
  res.send(201, Math.random().toString(36).substr(3, 8));
  return next();
});
server.put('/hello', send);
server.get('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
  res.send(204);
  return next();
});