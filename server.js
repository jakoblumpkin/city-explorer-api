'use strict';

// bring in the express libraray
// don't forget to do an npm install express
const express = require('express');

//allows us to access our env variables
require('dotenv').config();

//allow our front-end to access our server
const cors = require('cors');

const { default: axios } = require('axios');
//const superagent=require('superagent');

// initalizing the express library so I can use it
const app = express();

//this allows anyone to access our server - aka - the worlds worst body guard
app.use(cors());

const PORT = process.env.PORT;

//app.listen(PORT, () => console.log(`Listening ${PORT}`))


const handleWeather = require('./components/weather');
 
app.get('/weather', handleWeather);
app.get('/location', locationHandler);

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});



// turn on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// three ways to do it:
// 1. node server.js
// 2. npm start
// 3. nodemon - this is going to check for changes and update