const User = require('../models/User');
module.exports.register = async (req,res,next) => {
    const {username,email,password} = req.body;
    try {
        const user = await User.create({username,email,password});
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

module.exports.login = (req,res,next) => {
    res.send("Login Route");
}

module.exports.forgotPassword = (req,res,next) => {
    res.send("Forgot Password Route");
}

module.exports.resetPassword = (req,res,next) => {
    res.send("Reset Password Route");
}