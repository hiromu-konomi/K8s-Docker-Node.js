const express = require('express'),
    router = express.Router(),
    favoriteController = require('../controllers/favoriteController');

router.post('/switch/:id', favoriteController.switchFavorite);

module.exports = router;