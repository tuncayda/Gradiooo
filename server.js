const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

// Connect to database
const DB_URI = process.env.DATABASE_URI;
mongoose.connect(DB_URI, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Database connection successfull'));

// Define the color schema
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

// Start server
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});