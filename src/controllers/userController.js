const User = require('../models/userSchema');

exports.createUser = (req,res) => {
    console.log(req.body)
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
    })
}
