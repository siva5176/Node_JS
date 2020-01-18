const request = require('request');

const forecast = (longi, lati, callback) => {
    const url = 'https://api.darksky.net/forecast/d080006cd10aa741372d7e11d6cdb3a0/' + lati + ',' + longi;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Network Error', undefined)
        } else if (response.body.error) {
            callback('Location not found for given data', undefined)
        } else {
            callback(undefined,
                {
                    message: `it's ${response.body.hourly.data[0].summary}, with temprature of  ${response.body.currently.apparentTemperature} and the chance of rain is ${response.body.currently.cloudCover} %`,
                    response: response,
                }
            )
        }
    })
}

module.exports = forecast;