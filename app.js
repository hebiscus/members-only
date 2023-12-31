const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
require('dotenv').config();
require('./config/passportConf');
const passport = require('passport')
const mongoose = require('mongoose');
// const mongoDB = process.env.MONGODB_URI

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("ayo it works")
}
main().catch(err => console.log(err));

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/sign-up');
const joinclubRouter = require('./routes/join-club')
const messagesRouter = require('./routes/messages')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/join-club', joinclubRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
