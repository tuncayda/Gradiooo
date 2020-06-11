const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

// Variables
const DB_URI = process.env.DATABASE_URI;
const port = process.env.PORT || 8080;

// Serve assets e.g. js, css, img
app.use(express.static('public'));

// Print response data
app.use(morgan('dev'));

// Parse json
app.use(express.json());

// Controllers (handlers)
const getAllColors = (req, res) => {
};

const getColor = (req, res) => {
};

const createColor = (req, res) => {
};

const updateColor = (req, res) => {
};

const deleteColor = (req, res) => {
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

// Route for serving html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const colorRouter = express.Router();
const userRouter = express.Router();

// Mounting routers to endpoints
app.use('/api/v1/colors', colorRouter);
app.use('/api/v1/users', userRouter);

// Routes for handling colors
colorRouter
    .route('/')
    .get(getAllColors)
    .post(createColor);

colorRouter
    .route('/:id')
    .get(getColor)
    .patch(updateColor)
    .delete(deleteColor);

// Routes for handling users
userRouter
    .route('/').
    get(getAllUsers).
    post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// Connect to db
// mongoose.connect(DB_URI, {
//     useUnifiedTopology:true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(con => {
//     console.log('DB connection successfull');
// });

// // The color schema
// const colorSchema = new mongoose.Schema({
//     author: {
//         type: String,
//         required: false,
//         maxlength: [30, 'Maximum 30 characters']
//     },
//     title: {
//         type: String,
//         required: [true, 'Name your color'],
//         unique: true,
//         minlength: 1,
//         maxlength: [30, 'Maximum 30 charachters']
//     },
//     colors: {
//         type: [String],
//         required: true
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     rating: {
//         type: Number,
//         min: 0,
//         default: 0
//     },
//     downloads: {
//         type: Number,
//         min: 0,
//         default: 0
//     }
// });

// // Create color model of the color schema
// const Color = mongoose.model('Color', colorSchema);

// // Test document
// const testColor = new Color({
//     author: 'Tuncay Dagdelen',
//     title: 'Dreamlike',
//     colors: ['fad0c4', 'ffd1ff']
// });

// testColor.save().then(doc => {
//    console.log(doc);
// }).catch(err => {
//     console.log(err);
// });

// Start server
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
}); 