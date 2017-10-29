const express = require('express');
// eslint-disable-next-line
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
// eslint-disable-next-line
app.use(serveStatic(__dirname + '/dist'));

// eslint-disable-next-line
var port = process.env.PORT || 5000;
app.listen(port);

// eslint-disable-next-line
console.log('SIMS started on ' + port);
