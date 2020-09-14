const crypto = require('crypto');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('./../utils/email');

// Helper functions
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
            passwordChangedAt: req.body.passwordChangedAt,
            role: req.body.role
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
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        res.status(401).json({
            status: 'failed',
            message: 'The user belonging to this token does not exists'
        });
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        // TODO: Implement error handling
        res.status(401).json({
            status: 'failed',
            message: 'User recently changed password. Please log in again'
        });
    }
    req.user = currentUser;
    
    // Grant access to protected route
    next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Roles an array eg ['admin', ...]
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                status: 'failed',
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    }
}

exports.forgotPassword = async (req, res, next) => {
    // Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).json({
            status: 'failed',
            message: 'There is no user with that email address'
        });
    }

    // Generate the random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send it to users email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot password? Submit a PATCH with your new password and passwordConfirm to ${resetURL}.\nIf you didnt forget your password, please ignore this email`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 minutes)',
            message
        });
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500).json({
            status: 'failed',
            message: 'There was an error sending the email. Try again later'
        });
    }
}

exports.resetPassword = async (req, res, next) => {
    // Get user based on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken, 
        passwordResetExpires: {$gt:Date.now()}
    });

    // If token has not expired, and there is user, set the new password
    if(!user) {
        res.status(400).json({
            status: 'failed',
            message: 'Token is invalid or has expired'
        });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    try {
        await user.save();
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            err
        });
    }

    // Log the user in, send JWT
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
}

exports.updatePassword = async (req, res, next) => {
    // Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // Check if POSTed password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        res.status(401).json({
            status: 'failed',
            message: 'Your current password is wrong'
        });
    }

    // Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // Log the user in, send JWT
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
}