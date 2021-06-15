const Tweet = require('../models/tweetSchema'),
    User = require('../models/userSchema');

exports.createTweets = async (req,res) => {
    console.log('createTweet....')
    console.log(req.body);
    let user;
    User.find({},(error, result) =>{
        console.log(result)
        if( result.length !== 0 ){
            user = result[0]
            console.log(user)
        }
        if (error) console.log(error)

        Tweet.create({
            user:user,
            content:req.body.content
        },(error, result )=>{
            if(error) console.log(error)
            else
                console.log("saved : " + result);
            res.redirect('/tweets/')
        })
    })
}

exports.getAllTweets = (req,res) => {
    console.log('getAllTweets......')
    Tweet.find({}).populate('user').exec((error, result )=>{
        console.log(result)
        const user = {
            name:'testname',
            password:'tesrpass',
            email:'testmail'
        }
        // console.log(result[0]._id.getTimestamp())
        if ( result.length === 0 ){
            console.log("!result")
            res.render('tweets/index', {
                tweets:result,
                user:user
            })
        }
        if(!error)
            // User.findById(result.user)
            console.log("!error")
        res.render('tweets/index', {
            tweets:result,
            user:user
        })
    })
}
