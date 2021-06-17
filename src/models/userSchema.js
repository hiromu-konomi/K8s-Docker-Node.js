const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    password: String,
    email: {
        type:String,
        required:true,
        unique:true,
    },
    image: String,
});

// パスワード確認用のメソッド
UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema);