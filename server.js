/* eslint-disable indent */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieList = require('./movieList.js');
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(function validateBearerToken(req, res, next) {

    const authToken = req.get('Authorization');
    const apiToken = process.env.API_TOKEN;

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'});
    }

    next();
});



function handleGet(req, res) {
    const { genre, country, avg_vote } = req.query;
    let results = [ ...movieList ];
    console.log(req.query);
    if (genre) {
       results = results.filter(el => el.genre.toLowerCase().includes(genre.toLowerCase()));
    }
    if (country) {
        results = results.filter(el => el.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (avg_vote) {
        results = results.filter(el => el.avg_vote >= parseFloat(avg_vote));
    }


    res.send(results);

}

app.get('/movie', handleGet);




const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening at localhost:${PORT}`);
});