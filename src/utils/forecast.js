const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f2f1cfc6f6fdd643a1336618ddd90572/${latitude},${longitude}?units=si&lang=id`
    request({url:url, json: true}, (err, resp) => {
        if (err) {
            callback('Unable to connect to the service', undefined)
        }else if(resp.body.error){
            callback('Unable to find coordinates', undefined)
        }else{
            callback(undefined, resp.body.daily.data[0].summary+' It\'s currently '+ resp.body.currently.temperature + ' degrees out. There is a ' + resp.body.currently.precipProbability + '% chance of rain. '+ resp.body.currently.humidity+' humidity.')

        }
    })
}


module.exports = forecast