/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , stylus  = require('stylus')
  , nib = require('nib');

mongoose.connect('mongodb://localhost/node-todo');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({secret : "shhhhhhhhhhhhhh!"}));
  app.use(express.logger());

  app.use(stylus.middleware({
    src: __dirname + '/views',
    dest: __dirname + '/public',
    compile: function(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', false)
        .use(nib())
        .import('nib');
    }
  }));

  app.use(express.static(__dirname + '/public'));
  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
var api = require('./controllers/api.js');

app.get('/', api.index);

app.post('/', api.create);

app.get('/complete/:id', api.mark_completed);
app.get('/in-progress/:id', api.mark_inprogress);
app.get('/remove/:id', api.remove);

app.get('/empty', api.empty);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
