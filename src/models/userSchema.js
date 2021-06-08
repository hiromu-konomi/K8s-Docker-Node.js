const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    password: String,
    email: {
        type:String,
        required:true,
        unique:true,
    },
    image: String,
})

module.exports = mongoose.model('User', UserSchema);