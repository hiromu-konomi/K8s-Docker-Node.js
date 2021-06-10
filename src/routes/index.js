"use strict";

const router = require("express").Router(),
    userRoutes = require("./users"),
    tweetRoutes = require("./tweets"),
    favoriteRoutes = require("./favorites");

router.use("/account", userRoutes);
router.use("/tweet", tweetRoutes);
router.use("/favorite", favoriteRoutes);

module.exports = router;
