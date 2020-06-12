const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

// Start server
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});