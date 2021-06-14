const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userController');

router.post('/create', userController.createUser);

module.exports = router;
