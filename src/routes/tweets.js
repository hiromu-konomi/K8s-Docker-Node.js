const express = require('express'),
    router = express.Router(),
    auth = require('../lib/authenticate'),
    tweetController = require('../controllers/tweetController');

router.get('/', auth.ensureAuthenticated, tweetController.getAllTweets);
router.get('/confirmFavorites', auth.ensureAuthenticated, tweetController.confirmFavorites )
router.get('/confirmNotification', auth.ensureAuthenticated, tweetController.confirmNotification)
router.post('/create',auth.ensureAuthenticated, tweetController.createTweets);

module.exports = router;