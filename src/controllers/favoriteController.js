const Tweet = require('../models/tweetSchema'),
    User = require('../models/userSchema'),
    Favorite = require('../models/favoriteSchema');

exports.switchFavorite = async (req,res) => {
    console.log('switchFavorite....')
    console.log(req.params)
    let tweetUser;
    let loginUser;

    User.find({},async (error, result) =>{
        if( result.length !== 0 ){
            tweetUser = result[0]
            loginUser = result[1]
            console.log('tweetUser : ' + tweetUser)
            console.log('loginUser : ' + loginUser)

            //populateを利用することで参照先のidのみならずフィールド全てを取得
            await Favorite.find({'user': loginUser , 'tweet' : req.params.id, }).populate('tweet').exec( async (error, result) =>{
                if (error) console.log('fav find  err : ' + error)
                console.log('fav find result : ' + result)

                //フロー1
                if(result.length === 0){
                    //tweet._idから投稿内容を取得
                    await Tweet.findById(req.params.id, async (err, result) =>{
                        if(err) console.log( 'tweet findById err : ' + err )
                        console.log('tweet findById result : ' + result)

                        //これらのデータをもとにfavoriteドキュメントを作成
                        await Favorite.create({
                            user:loginUser,
                            tweet: result,
                            status: true
                        }, async (error, result )=>{
                            if(error) console.log('fav create err : ' + error)
                            console.log("fav create saved : " + result);
                        })
                    })
                }
                //フロー2
                else {
                   console.log('status preUpdate : ' + result[0].status)
                   if (result[0].status === true) result[0].status = false
                   else result[0].status = true
                   console.log('status updated : ' + result[0].status)
                   await result[0].save()
                }
            })
        }
     })
    res.redirect('/tweets/')
}

//フロー1：いいねボタン押下時にドキュメント作成
//user:ログイン中のuser
//tweet:その投稿内容（idから取得）
//status:押下時に作るためtrue

//フロー2：すでにいいねされているボタンを押下した時
//すでに作成されているドキュメントのstatusを変更する
//検索方法はuserとtweet_idで行う
//取得できなかったらフロー1を行う



