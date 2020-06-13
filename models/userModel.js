const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        required: [true, 'Confirm password'],
        validate: {
            // Validate only works on create and save
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    }
});

// Pre hook runs between getting the data and pushing it to the database
userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;