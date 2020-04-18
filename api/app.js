const express  =require( 'express');
const bodyparser = require ('body-parser');
const path = require('path');

const app = express();
const router = require('./src/router');

const pathToindex = path.join(__dirname, '../client/index.html');
app.use('/', router);
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname,'uploads')));
app.use ('/*', (req, res) => {
    res.sendfile(pathToindex);
});

module.exports = app;
