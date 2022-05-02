const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
        require : [true , "Please provide a username"],
    },
    email : {
        type: String,
        require : [true , "Please provide an email"],
        unique : true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password : {
        type : String,
        require : [true , "Please provide a password"],
        minlength: 6,
        //? Usage's select: when query the user, the password will not be returned
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({id : this._id},process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE}
    );
}
const User = mongoose.model('User', UserSchema);

module.exports = User;