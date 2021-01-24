const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

// Connect to the database
const DB_URI = process.env.DATABASE_URI;
mongoose.connect(DB_URI, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Database connection successful'));

// Start the node server
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

// Shut down the app gracefully
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated!')
    });
});