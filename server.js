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

// Start server
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});