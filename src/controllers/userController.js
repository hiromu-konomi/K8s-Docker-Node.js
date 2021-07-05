const User = require('../models/userSchema'),
        bcrypt = require('bcryptjs');

exports.getAllUsers = async (res) => {
    User.find({},(error, result )=>{
        console.log(result);
        if(!error) res.render('users/index', {
            user: result
        });
    });
};

exports.createUser = async (req,res) => {
    User.create({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    },(error, result )=>{
        if(error) console.log(error);
        else console.log("saved : " + result);
        User.find({}, (error, result) => {
            if (error) console.log(error);
            console.log('show users collection');
            console.log(result);
        });
        res.redirect('/');
    });
};
