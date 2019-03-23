const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a80e393f14ea9a11fba82bcfe61e0628/' + latitude + ',' + longitude + '?units=si';
    request({url, json:true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather services", undefined);
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            const temp = response.body.currently.temperature;   
            const rain = response.body.currently.precipProbability;
            const tempHigh = response.body.daily.data[0].temperatureHigh;
            const tempLow = response.body.daily.data[0].temperatureLow;
            callback(undefined, response.body.daily.data[0].summary + " It is curently " + temp + " degrees out. There is a " + rain 
                + "% change of rain. The highest temperature today would be " + tempHigh 
                + " degrees while the lowest would be " + tempLow + " degrees.")
        }
    })
}

module.exports = forecast;