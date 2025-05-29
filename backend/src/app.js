const app = require('express')();
const bodyParser = require('express').json;

app.use(bodyParser());

module.exports = app;