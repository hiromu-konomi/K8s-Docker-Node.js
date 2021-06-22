const Tweet = require('../models/tweetSchema'),
    Favorite = require('../models/favoriteSchema');

exports.switchFavorite = async (req, res) => {
    console.log('switchFavorite....')
    if (req.user === undefined) {
        console.log("no has loginUser....")
    } else {
        //populateを利用することで参照先のidのみならずフィールド全てを取得
        await Favorite.find({
            'user': req.user,//ログインユーザー
            'tweet': req.params.id,//対象投稿内容
        }).populate('tweet').exec(async (error, result) => {
            if (error) console.log('fav find  err : ' + error)
            //フロー1
            if (result.length === 0) {
                //tweet._idから投稿内容を取得
                await Tweet.findById(req.params.id, async (err, result) => {
                    if (err) console.log('tweet findById err : ' + err)
                    //これらのデータをもとにfavoriteドキュメントを作成
                    await Favorite.create({
                        user: req.user,//いいねを押したユーザー
                        tweet: result,
                        isFavorite: true,
                        isRead: false
                    }, async (error, result) => {
                        if (error) console.log('fav create err : ' + error)
                        else {
                            console.log("fav create saved : " + result);
                            await res.json(result)
                        }
                    })
                })
            }
            //フロー2
            else {
                console.log('status preUpdate : ' + result[0].isFavorite)
                if (result[0].isFavorite === true) result[0].isFavorite = false
                else result[0].isFavorite = true
                console.log('status updated : ' + result[0].isFavorite)
                await result[0].save()
                res.contentType('json');
                res.json(result[0].isFavorite)
            }
        })
    }
}

//フロー1：いいねボタン押下時にドキュメント作成
//user:ログイン中のuser
//tweet:その投稿内容（idから取得）
//status:押下時に作るためtrue

//フロー2：すでにいいねされているボタンを押下した時
//すでに作成されているドキュメントのstatusを変更する
//検索方法はuserとtweet_idで行う
//取得できなかったらフロー1を行う


//通知機能
//いいねボタン押下時に通知を送る
//いいねのtrue or falseの切り替え後処理を行う
//切り替え後の値がtrueの場合に通知する
//tweet_idから投稿したユーザーを特定する
//通知内容を確認しているか（isRead）の値がfalseの場合、通知が来てることを分かるようにする（ページないのどこかを赤にするとか）

//投稿一覧画面遷移時、通知内容が存在するか確認
//（isReadがfalseのfavoritesドキュメントが１つでも存在したら）アイコン光らせる？


exports.switchIsRead = async (req,res) => {
    await Favorite.find({'user': { '$ne':req.user } ,'isRead': false})
        .populate({path:'user'}).populate({path:'tweet',match:{user:req.user._id}}).exec(async (err, result) => {
            if (err) console.log(err)
            else {
                // console.log('fav find isRead...' + result)
                //mongoDBからフィルタリングしてもnullが返ってきて取得したくないものも取ってきてしまうので
                // for文で投稿内容がnull以外のものを新たに連想配列として作成
                for (let i = 0 ; i < result.length ; i++ ){
                    if (result[i].tweet !== null ){
                        result[i].isRead = true
                        await result[i].save()
                    }
                }
            }
            console.log('isRead....' + result)
        })
    res.json('')
}