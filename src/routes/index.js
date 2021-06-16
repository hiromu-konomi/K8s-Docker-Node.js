const router = require('express').Router(),
    usersRouter = require('./users'),
    tweetsRouter = require('./tweets'),
    favoritesRouter = require('./favorites');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('RRRRouter!!')
  res.render('index', { title: 'Express'});
});
router.get('/register', function(req, res, next) {
  res.render('account/register');
});

router.get('/test_register', function(req, res, next) {
  res.render('register');
});

router.use('/users', usersRouter);
router.use('/tweets', tweetsRouter);
router.use('/favorites', favoritesRouter);

module.exports = router;
