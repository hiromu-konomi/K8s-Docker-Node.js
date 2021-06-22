const express = require('express'),
    router = express.Router(),
    auth = require('../lib/authenticate'),
    favoriteController = require('../controllers/favoriteController');

router.post('/switch/:id', auth.ensureAuthenticated, favoriteController.switchFavorite);
router.post('/isRead', auth.ensureAuthenticated, favoriteController.switchIsRead);

module.exports = router;