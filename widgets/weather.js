'use strict';
const DarkSky = require('dark-sky');
const forecast = new DarkSky(require('../config').darksky); //API CODE



let weather = {};

weather.init = function(settings){
  weather.settings = settings;
};

weather.run = function () {
  return forecast
    .latitude(weather.settings.lat)            // required: latitude, string.
    .longitude(weather.settings.long)          // required: longitude, string.
    .units('ca')                    // optional: units, string, refer to API documentation.
    .language('de')                 // optional: language, string, refer to API documentation.
    .get();                          // execute your get request.
};

module.exports = weather;