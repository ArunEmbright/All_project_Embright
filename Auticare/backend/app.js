var createError = require('http-errors');

var express = require('express');
const router = express.Router();
require('dotenv/config');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
const cors = require('cors')

const mongoose = require('mongoose')

var therapistRoute = require('./routes/therapist')
var institutionRoute = require('./routes/institution')
var authRoute = require('./routes/auth')
var adminRoute = require('./routes/admin')
var payRoute = require('./routes/razorpay')
var app = express();
  

// view engine setup incommin engine setup

mongoose.connect(process.env.MongoURI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log(err));

app.use('/welcome',express.static(__dirname + '/landing'));
app.use(express.static(__dirname + '/dist'));

app.use(cors({ 
  origin:process.env.CORS
  
}))

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade');

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('./public', express.static(path.join('')));
app.use('./public/certificate', express.static(path.join('certificate')));

app.use('./public/institutiondoc2', express.static(path.join('document')));
app.use('./public/institutiondoc', express.static(path.join('otherDocuments')));
app.use('./public/therapist', express.static(path.join('therapist')));
app.use('/auth',authRoute) 
app.use('/admin',adminRoute) 
app.use('/therapist',therapistRoute)
app.use('/institution',institutionRoute)
app.use('/pay',payRoute) 



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
  // router.get('/', (req, res) => {
  //   res.send('welcome to App')
  // });
  
  
  module.exports = app;