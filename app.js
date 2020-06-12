const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const colorRouter = require('./routes/colorRoutes');
const userRouter = require('./routes/userRoutes');

// Middlewares for serving assets, logging responses and parsing json
app.use(express.static(`${__dirname}/public`));
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Route for serving html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Mounting routers to endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/colors', colorRouter);

// Connect to db
// const DB_URI = process.env.DATABASE_URI;
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

module.exports = app;