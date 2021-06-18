const router = require('express').Router(),
    usersRouter = require('./users'),
    tweetsRouter = require('./tweets'),
    favoritesRouter = require('./favorites'),
    authenticate = require('../lib/authenticate');

/* GET home page. */
router.get('/', authenticate.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('account/register', { title: '登録画面' });
});
router.get('/login', function(req, res, next) {
  res.render('account/login', { title: 'ログイン画面' });
});

router.get('/test_register', function(req, res, next) {
  res.render('register');
});

router.use('/users', usersRouter);
router.use('/tweets', tweetsRouter);
router.use('/favorites', favoritesRouter);

module.exports = router;
