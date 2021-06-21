const router = require('express').Router(),
    userController = require('../controllers/userController'),
    passport = require('passport');

router.post('/create', userController.createUser);
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/tweets',
        failureRedirect: '/login',
        session: true
    })
);
router.post('/logout', (req, res) => {
    req.session.passport = undefined;
    res.redirect('/');
});

module.exports = router;
