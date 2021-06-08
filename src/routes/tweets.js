const express = require('express'),
    router = express.Router(),
    tweetController = require('../controllers/tweetController');

router.get('/', tweetController.getAllTweets);
router.post('/create', tweetController.createTweets);

module.exports = router;