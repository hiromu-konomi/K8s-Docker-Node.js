const User = require('../models/userSchema'),
        bcrypt = require('bcryptjs');

exports.getAllUsers = (req,res) => {
    User.find({},(error, result )=>{
        console.log(result)
        console.log(result[0]._id.getTimestamp())
        if(!error) res.render('users/index', {
            user:result
        })
    })
}

exports.createUser = (req,res) => {
    User.create({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        image: "",
    },(error, result )=>{
        if(error) console.log(error)
        else console.log("saved : " + result);
        User.find({}, (error, result) => {
            if (error) console.log(error)
            console.log('show users collection')
            console.log(result)
        })
        res.redirect('/')
    });
}
