const path = require('path');
const morgan = require('morgan');
const express = require('express');

const colorRouter = require('./routes/colorRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares for serving assets, logging responses and parsing json
app.use(express.static(path.join(__dirname, 'public')));
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Route for serving html
app.get('/', (req, res) => {
    res.status(200).render('base');
});

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

// Mounting routers to endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/colors', colorRouter);

module.exports = app;