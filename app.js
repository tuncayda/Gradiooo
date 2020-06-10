const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;

// Serve assets e.g. js, css, img
app.use(express.static('public'));

// Print response data
app.use(morgan('dev'));

// Serve html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Get db connection string
const DB_URI = process.env.DATABASE_URI;

// Handlers
const getAllColors = (req, res) => {
    // TODO
};

const getColor = (req, res) => {
    // TODO
};

const createColor = (req, res) => {
    // TODO
};

const updateColor = (req, res) => {
    // TODO
};

const deleteColor = (req, res) => {
    // TODO
};

// Routes
// app.get('/api/v1/colors', getAllColors);
// app.post('/api/v1/colors', createColor);
// app.get('/api/v1/colors/:id', getColor);
// app.patch('/api/v1/colors/:id', updateColor);
// app.delete('/api/v1/colors/:id', deleteColor);

app.route('/api/v1/colors')
.get(getAllColors)
.post(createColor);

app.route('/api/v1/colors/:id')
    .get(getColor)
    .patch(updateColor)
    .delete(deleteColor);

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