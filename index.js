var restify = require('restify');
var mongoose = require('mongoose');
var mongodb = require('./mongodb.js');

var PORT = process.env.PORT || 8081;

var server = restify.createServer({
    name: 'prioriTzAPI'
});
server.use(restify.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
    mongodb.connect();
});

server.post('/item', function(req, res, next) {
    mongodb.createItem(req.body, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send(201, result);
    });
    return next();
});

server.put('/item/:_id', function(req, res, next) {
    mongodb.updateItem(req.params._id, req.body, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send(201, result);
    });
    return next();
});

server.get('/item/:_id', function(req, res, next) {
    mongodb.getItem(req.params._id, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send(200, result);
    });
    return next();
});;
server.get('/item', function(req, res, next) {
    mongodb.getAllItems(function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send(200, result);
    });
    return next();
});;

server.del('/item/:_id', function(req, res, next) {
    mongodb.delItem(req.params._id, function(err) {
        if (err) {
            res.send(err);
        }
        res.send(200, { success: true });
    });
    return next();
});