const router = require('express').Router(),
    usersRouter = require('./users'),
    tweetsRouter = require('./tweets');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.use('/users', usersRouter);
router.use('/tweet', tweetsRouter);

module.exports = router;
