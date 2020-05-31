var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const helmet = require('helmet')
const config = require('./config')
var cookieSession = require('cookie-session')

require("babel-polyfill");


mongoose.connect(config.address, config.auth);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database...')
});

var indexRouter = require('./routes/index');
var activateRouter = require('./routes/activate');
var signUpRouter = require('./routes/signup');
var signInRouter = require('./routes/signin');
var signOutRouter = require('./routes/signout');
var dataRouter = require('./routes/data');
var updateRouter = require('./routes/update');
var publishRouter = require('./routes/publish');
var exploreRouter = require('./routes/explore');
var downloadRouter = require('./routes/download');
var deleteRouter = require('./routes/delete');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cookieSession(config.session));

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/activate', activateRouter);
app.use('/signin', signInRouter);
app.use('/signout', signOutRouter);
app.use('/data', dataRouter);
app.use('/update', updateRouter);
app.use('/publish', publishRouter);
app.use('/explore', exploreRouter);
app.use('/download', downloadRouter);
app.use('/delete', deleteRouter);

module.exports = app;
