/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {

    const bearerToken = req.get('Authorization').split(' ')[1];

    const apiToken = process.env.API_TOKEN;
    console.log(apiToken);
    if (bearerToken !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'});
    }
    next();
});



function handleGet(req, res) {
    res.send('Movies??');
}

app.get('/movies', handleGet);




const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening at localhost:${PORT}`);
});