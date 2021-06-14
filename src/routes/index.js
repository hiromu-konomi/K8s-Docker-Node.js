const router = require('express').Router(),
    usersRouter = require('./users'),
    tweetsRouter = require('./tweets');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('RRRRouter!!')
  res.render('index', { title: 'Express' });
});
router.get('/account/register', function(req, res, next) {
  res.render('account/register');
});

router.use('/users', usersRouter);
router.use('/tweet', tweetsRouter);

module.exports = router;
