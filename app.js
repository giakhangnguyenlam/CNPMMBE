// ==================> declare object <=====================

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
require('./config/DBConnection');

// ==================> Declare router <=====================

const indexRouter = require('./routes/index');
const imagesRouter = require('./routes/images');

var app = express();

// ===========> view engine setup <=================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ==============> Middleware <====================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// fix cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    res.setHeader("Access-Control-Max-Age", "3600");
    next();
})



// ================> Routes <=======================
app.use('/', indexRouter);
app.use('/upload', imagesRouter);




// ========> catch 404 and forward to error handler <===============
app.use(function(req, res, next) {
  next(createError(404));
});




// ==========> error handler <===============
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
