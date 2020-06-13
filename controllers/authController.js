const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = signToken(newUser._id); 

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

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