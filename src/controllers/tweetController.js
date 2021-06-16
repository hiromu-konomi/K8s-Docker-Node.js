const Tweet = require('../models/tweetSchema'),
    User = require('../models/userSchema');

exports.createTweets = async (req,res) => {
    console.log('createTweet....')
    console.log(req.body);
    //本来であれば、ログイン中のユーザー情報をreq.userから取得する
    let user;
    User.find({},(error, result) =>{
        console.log(result)
        if( result.length !== 0 ){
            user = result[0]
        }
        if (error) console.log(error)
        Tweet.create({
            user:user,
            content:req.body.content
        },(error, result )=>{
            if(error) console.log(error)
            else console.log("saved : " + result);
            res.redirect('/tweets/')
        })
    })
}

exports.getAllTweets = async (req,res) => {
    console.log('getAllTweets......')
    await Tweet.find({}).populate('user').exec((error, result )=>{
        console.log('result : ' + result)
        //本来であれば、ログイン中のユーザー情報をreq.userから取得する
        const user = {　name:'testname', password:'tesrpass', email:'testmail'}
        if(error) console.log("error")
        res.render('tweets/index', {
            tweets:result,
            user:user
        })
    })
}
