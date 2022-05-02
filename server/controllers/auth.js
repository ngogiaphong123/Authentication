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

module.exports.login = async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400).json({
            success: false,
            error: "Please provide email or password"
        })
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            res.status(404).json({
                success:false,
                error: "Invalid credentials"
            })
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            res.status(404).json({
                success:false,
                error: "Invalid credentials"
            })
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