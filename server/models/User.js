const mongoose = require('mongoose');
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

const User = mongoose.model('User', UserSchema);

module.exports = User;