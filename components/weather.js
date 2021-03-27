'use strict';
const { default: axios } = require('axios');


async function handleWeather(req, res){
  const theCity=req.query;
  const url=`https://api.weatherbit.io/v2.0/current?lat=${theCity.lat}&lon=${theCity.lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`;
  const result=await axios.get(url);

  //grap data from api object
  const temp=result.data.data[0].temp;
  const description=result.data.data[0].weather.description;
  const datatoPass='The Tempature is '+temp+' degrees celcius with '+ description+ ' as description.';
  res.status(200).send(datatoPass);
  console.log('It worked!');
}

module.exports = handleWeather;