const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    router = require('./routes/index'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/userSchema'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express();


mongoose.connect('mongodb://mongo:18fuw63x@mongo:27017/test?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log('connect')
}).catch((err) => {
    console.log('error')
    console.error(err);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//消さないでおいてくれると助かります
// mongoose.connect('mongodb://root:test@mongo:27017/test?authSource=admin', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(()=>{
//   console.log('connect')
// }).catch((err) => {
//   console.log('error')
//   console.error(err);
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// index.htmlのformから受け取った値を認証するための関数に渡すために必要
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//ajax用
app.use('/public' , express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'passport test'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false,
  session: false,
}, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function (user, done) {
  console.log("serialize")
  // console.log(user)
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("deserialize")
  // console.log(user)
  done(null, user);
});

// routing
app.use("/", router);

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

console.log("app.js!!")

module.exports = app;