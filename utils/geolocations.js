const request = require('request');

const geoLocation = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1Ijoic2hpdmE1MTc2IiwiYSI6ImNrNTFqdGo3ZTB4cGgzbXBndDFyYWlqanQifQ.7KtFfXricF-7Md4kZXVBMA&limit=1';
    request({url:url, json:true}, (error, response={}) => {
        if (error) {
            callback('Network error', undefined)
        } else if(response.body.error) {
            callback('location not found');
        } else {
            if(response.body && response.body.features) {
                const longitude = response.body.features[0].center[0];
                const latitude = response.body.features[0].center[1];
                const data = {
                    longitude: longitude, latitude: latitude, place_name: response.body.features[0].place_name
                }
                callback(undefined,data)
            } else {
                callback('Location Error', undefined);
            }
            
        }
    })
}

module.exports = geoLocation;