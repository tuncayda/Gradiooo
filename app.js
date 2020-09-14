const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');


const colorRouter = require('./routes/colorRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares for serving assets, logging responses and parsing json
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Compress data sent to client
app.use(compression());

// Mounting routers to endpoints
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/colors', colorRouter);

module.exports = app;