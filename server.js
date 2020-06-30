const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');

const index = require('./routes/index');
const main = require('./routes/main');
const api_main = require('./routes/api-main');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(ejsLayouts);


// uncomment after placing your favicon in /public
// var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/main', main);
app.use('/api/v1', api_main);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page or Route Not Found' + ' | errorCode: ' + 404);
  res.status(404);
  res.render('pages/error', {
    title: 'Error',
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
