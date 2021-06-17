const User = require('../models/userSchema');

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
    console.log(req.body);
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        image:"",
    },(error, result )=>{
        if(error) console.log(error)
        else
            console.log("saved : " + result);
        res.redirect('/')
    });
}
