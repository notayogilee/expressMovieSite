var express = require('express');
var router = express.Router();
const request = require('request');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

// middleware
router.use((req, res, next) => {
  // res.locals give global access 
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
})

/* GET home page. */
router.get('/', function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {

    const parsedData = JSON.parse(movieData);
    // res.json(parsedData);
    res.render('index', {
      parsedData: parsedData.results
    })
  })

});

module.exports = router;
