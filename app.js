var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sesstion = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')


var app = express();

// mongoose.connect('localhost:27017/shopping')
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sesstion({secret: 'mysecret', resave: false, saveUninitialized: false}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// var Mongo = require('mongodb').MongoClient;

// const url = "mongodb://localhost:27017/"


// app.get('/user', function(req, res) {


// Mongo.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("admin");
//     var myobj = { name: " Inc", address: "Highway 7" };
//     dbo.collection("User").findOne(myobj).then((rs)=>{
//       return res.status(200).json({
//         code: 1,
//         data: rs
//       })
//       console.log(rs)
//     }).catch(()=>{
//       return res.status(200).json({
//         code: 0
//       })
//     })
//     });
// }); 






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
