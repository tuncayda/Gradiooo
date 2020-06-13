const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter user name'],
        maxlength: [30, 'Maximum 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Enter emal'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Provide a password'],
        minlength: [8, 'Password must have minimum 8 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm password']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;