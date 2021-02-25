
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
const { viewFriends } = require('./routes/friends');
// const { viewList } = require('./routes/friends');
const { viewProfile } = require('./routes/profile');
const { setTimer } = require('./routes/settimer');
const { viewWorkSession } = require('./routes/worksession');
const { viewToDoList } = require('./routes/todolist');
const { viewDummyFriend } = require('./routes/dummyFriend');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/friends', viewFriends);
// app.get('/friends', viewList);
app.get('/dummyfriend', viewDummyFriend);
app.get('/profile', viewProfile);
app.get('/todolist', viewToDoList);
app.get('/settimer', setTimer);
app.get('/worksession', viewWorkSession);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
