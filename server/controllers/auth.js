const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
module.exports.register = async (req,res,next) => {
    const {username,email,password} = req.body;
    try {
        const user = await User.create({username,email,password});
        sentToken(user,201,res);
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return next(new ErrorResponse('Please provide email and password',400));
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return next(new ErrorResponse('Invalid Credentials',401));
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return next(new ErrorResponse('Invalid Credentials',401));
        }
        sentToken(user,201,res);
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

module.exports.forgotPassword = (req,res,next) => {
    res.send("Forgot Password Route");
}

module.exports.resetPassword = (req,res,next) => {
    res.send("Reset Password Route");
}

const sentToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(200).json({success: true, token: token});
}