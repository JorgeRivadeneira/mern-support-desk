const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

export const protect = asyncHandler(async (req: any, res: any, next: any) => {
    let token: any;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            // console.log('auth', decoded, req.user);
            if (!req.user) {
                res.status(401)
                throw new Error('Not authorized')
            }            
            next()          
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not Authorized');
    }
});