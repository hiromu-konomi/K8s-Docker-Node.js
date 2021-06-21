const Tweet = require('../models/tweetSchema'),
    Favorite = require('../models/favoriteSchema'),
    User = require('../models/userSchema');

exports.createTweets = async (req, res) => {
    console.log('createTweet....')
    Tweet.create({
        user: req.user,
        content: req.body.content
    }, (error, result) => {
        if (error) console.log(error)
        else console.log("saved : " + result);
        res.redirect('/tweets/')
    })
}

exports.confirmFavorites = async (req, res) => {
    let array = []
    Favorite.find({'user': req.user, 'isFavorite': true})
        .populate('tweet').exec(async (err, result) => {
        if (err) console.log(err)
        else {
            for (let i = 0; i < result.length; i++) {
                array.push(result[i].tweet.id)
            }
            await res.json(array)
        }
    })
}
exports.confirmNotification = async (req, res) => {
    let notificationArray = [];
    //自分以外（ログインユーザー以外の人がいいねした投稿内容）
    await Favorite.find({'user': { '$ne':req.user } ,'isRead': false})
        .populate({path:'user'}).populate({path:'tweet',match:{user:req.user._id}}).exec(async (err, result) => {
            if (err) console.log(err)
            else {
                console.log('fav find isRead...' + result)
                //mongoDBからフィルタリングしてもnullが返ってきて取得したくないものも取ってきてしまうので
                // for文で投稿内容がnull以外のものを新たに連想配列として作成
                for (let i = 0 ; i < result.length ; i++ ){
                    if (result[i].tweet !== null ){
                        notificationArray.push(result[i])
                    }
                }
            }
            await res.json({
                result:notificationArray,
                loginUser:req.user,
            })
        })
}

exports.getAllTweets = async (req, res) => {
    //取得する際にログインユーザーがいいねした投稿内容を把握する必要あり
    console.log('getAllTweets......')
    await Tweet.find({}).populate('user').exec((error, result) => {
        //本来であれば、ログイン中のユーザー情報をreq.userから取得する
        const user = {name: 'testname', password: 'tesrpass', email: 'testmail'}
        if (error) console.log("error")
        if (req.user) {
            res.render('tweets/index', {
                tweets: result,
                user: req.user
            })
        } else {
            res.render('tweets/index', {
                tweets: result,
                user: user
            })
        }
    })
}
