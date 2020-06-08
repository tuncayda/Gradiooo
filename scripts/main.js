// const t = require('./color');
// t();

require('dotenv').config({path: __dirname + '../.env'});
console.log(process.env.TEST);
console.log(require('dotenv').config())
