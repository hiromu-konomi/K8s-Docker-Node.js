const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    user:
        {type:Schema.Types.ObjectId, ref:'User'}
    ,
    tweet:
        {type:Schema.Types.ObjectId, ref:'Tweet'}
    ,
    status: Boolean
})

module.exports = mongoose.model('Favorite', FavoriteSchema);