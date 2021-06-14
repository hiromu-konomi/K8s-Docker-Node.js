const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    indexRouter = require('./routes/index'),
    app = express();

//require('dotenv').config();

console.log(9)
//console.log(process.env)

mongoose.connect('mongodb://root:test@mongo:27017/test?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // auth: { authSource: "admin" },
    // user: "root",
    // pass: "test",
}).then(()=>{
    console.log('connect')
}).catch((err) => {
    console.log('error')
    console.error(err);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//mongoose.Promise = global.Promise


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//ルーティングを一括管理するroutesファイルに接続
app.use('/', indexRouter);

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
