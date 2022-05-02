module.exports.register = (req,res,next) => {
    res.send("Register Route");
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