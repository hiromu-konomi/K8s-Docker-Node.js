const User = require('../models/userSchema');

module.exports = {
    show: async (req, res) => {
        res.render('../views/account/login.ejs');
    }
}