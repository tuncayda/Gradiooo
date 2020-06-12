const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    author: {
        type: String,
        required: false,
        maxlength: [30, 'Maximum 30 characters']
    },
    title: {
        type: String,
        required: [true, 'Name the color'],
        unique: [true, 'The color title is already taken'],
        minlength: 1,
        maxlength: [30, 'Maximum 30 charachters']
    },
    colors: {
        type: [String],
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min: 0,
        default: 0
    },
    downloads: {
        type: Number,
        min: 0,
        default: 0
    }
});

// Create a model from the color schema
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;