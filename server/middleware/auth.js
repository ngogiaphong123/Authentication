const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
module.exports.protect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //! Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new ErrorResponse('Not authorized to access this page',401));
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if(!user) return next(new ErrorResponse('Not user found'),404);
        req.user = user;
        return next();
    }
    catch(err) {
        return next(new ErrorResponse('Not authorized to access this page',401));
    }
}