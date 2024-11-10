var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/userRoutes');
var entityRouter = require('./routes/entityRoutes');
var userEntityRouter = require('./routes/userEntityRoutes');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users',usersRouter);
app.use('/entities',entityRouter);
app.use('/user-entities',userEntityRouter);

// app.all('*', (req, res, next) => {
//   next(res.status(404).json({error:`Impossible de trouver ${req.originalUrl} sur ce serveur`}));
// });


module.exports = app;
