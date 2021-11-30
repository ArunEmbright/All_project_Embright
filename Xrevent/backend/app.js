var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

const bodyParser = require('body-parser');

var speakerRouter = require('./routes/speaker');
const speakerStorageRouter = require ('./routes/speaker.imageStorage');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/event');
var exhibitorsRouter = require('./routes/exhibitor');
var assetsRouter = require('./routes/asset')
var teamsRouter = require('./routes/team');
var productsRouter = require('./routes/product');

var app = express();

app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:4200'
 
}))
app.use('./public/image', express.static(path.join('image')))
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Arun:PaSsWord@cluster0.rtp6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(()=>{
  console.log('Connection is operated')
}).catch(err=>{
  console.log(`failure ${err.message}`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/speakers', speakerRouter);
app.use('/storage/speaker', speakerStorageRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/exhibitors', exhibitorsRouter);
app.use('/teams',teamsRouter)
app.use('/assets',assetsRouter)
app.use('/products',productsRouter)
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
