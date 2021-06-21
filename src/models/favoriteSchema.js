const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    user:
        {type:Schema.Types.ObjectId, ref:'User'}
    ,
    tweet:
        {type:Schema.Types.ObjectId, ref:'Tweet'}
    ,
    isFavorite: Boolean,
    isRead: Boolean
})

module.exports = mongoose.model('Favorite', FavoriteSchema);