const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    token:{
        type: String
    }

});

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
        bycrypt.genSalt(SALT_I, function (err, salt) {
            if(err) return next(err);
            bycrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
});


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bycrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch)

    })
};

userSchema.methods.generateToken = function(cb){
    const user = this;
    user.token = jwt.sign(this._id.toHexString(), 'mydirtylittlesecret');
    user.save(function (err,user) {
        if(err) return cb(err);
        cb(null, user)
    })
};

userSchema.statics.findByToken = function(token,cb){

    const user = this;
    jwt.verify(token,"mydirtylittlesecret", function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if (err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User};