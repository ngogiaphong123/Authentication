const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
module.exports.register = async (req,res,next) => {
    const {username,email,password} = req.body;
    try {
        const user = await User.create({username,email,password});
        res.status(201).json({
            success: true,
            user
        })
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
        res.status(201).json({
            success: true,
            token: "random-token"
        })
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