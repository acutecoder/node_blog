
/**
 * Module dependencies.
 */

 // NPM
var express = require('express')
  , http = require('http')
  , path = require('path')
  , url = require('url')

//  Routes
  , routes = require('./routes')
  , user = require('./routes/user')
  , blogs = require('./routes/blogs')
  , has = require('./routes/has')
  , admin = require('./routes/dashboard')

//  Libs
  , AM = require('./libs/account_manager')
  ;


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//  Index
app.get('/', routes.index);

//  Public
//app.get('/users', user.list);
app.get('/blogs', blogs.blogs);

//  Private
app.get('/admin', function( req, res ) {

  var callbacks = {
    failure : routes.index,
    success : admin.dashboard
  };
  AM.check_auth( req, res, callbacks );

});

app.post('/some', function( req, res ) {
  res.send( AM.log_in( req, res ) );
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
