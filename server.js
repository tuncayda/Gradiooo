var express = require('express');
var app = express();
var path = require('path');

require('dotenv').config();


const PORT = process.env.PORT;

// serve assets
app.use(express.static('public'));

// localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});