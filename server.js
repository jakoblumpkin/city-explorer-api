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
 
app.get('/weather', handleWeather);
app.get('/location', locationHandler);

app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

async function locationHandler(req, res){
  console.log('here');
  try {
  console.log(req.query);
  const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${req.query.city}&format=json`;
  const result=await axios.get(url);
  console.log(result.body);
  } catch (error) {
    console.log(error);
  }


}








async function handleWeather(req, res){
  console.log('worked');
  const theCity=req.query;
  console.log(theCity);
  const url=`https://api.weatherbit.io/v2.0/current?lat=${theCity.lat}&lon=${theCity.lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
  const result=await axios.get(url);

  //grap data from api object
  const temp=result.data.data[0].temp;
  const description=result.data.data[0].weather.description;
  const datatoPass='The Tempature is '+temp+' degrees celcius with '+ description+ ' as description.';
  res.status(200).send(datatoPass);
  



  //'api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}'

  //console.log('made it to weather');
  //const forecastArray=weather.data.map(day => {
    // return new forecastArray(day, weather.city_name, weather.lat, weather.lon);
  //});
  //res.status[200].send(forecastArray);
}

function Forecast(obj, city, lat, lon) {
  this.desc=obj.weather.description;
  this.date=obj.datetime;
  this.city=city;
  this.lat=lat;
  this.lon=lon;
}

// turn on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// three ways to do it:
// 1. node server.js
// 2. npm start
// 3. nodemon - this is going to check for changes and update