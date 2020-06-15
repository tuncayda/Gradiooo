const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Helper function
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// Sign up the user
exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                newUser
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

// Login the user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // Check if email and password exists
        if (!email || !password) {
            res.status(404);
        }
        // Check if the user exists and the password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            // TODO: Implement error handling
            res.status(404).json({
                status: 'failed',
                message: err
            });
        }

        // If everything is ok, send token to the client
        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

// Protect resource
exports.protect = async (req, res, next) => {
    // Check if token exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        // TODO: Implement error handling
        res.status(401).json({
            status: 'failed',
            message: 'You are not logged in, please log in to get access'
        });
    }
    
    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        console.log('CONSOLE: User does not exists');
        res.status(401).json({
            status: 'failed',
            message: 'The user belonging to this token does not exists'
        });
    }

    // Check if user changed password after the token was issued
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        // TODO: Implement error handling
        res.status(401).json({
            status: 'failed',
            message: 'User recently changed password. Please log in again'
        });
    }
    req.user = freshUser;
    
    // Grant access to protected route
    next();
}