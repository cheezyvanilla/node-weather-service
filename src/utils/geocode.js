const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiemlhdGhhZGFtIiwiYSI6ImNqd2FmbjJncTA0bXk0M3A0MjM4MGxoM3YifQ.rAByP8RiicE9Lx9bP_Cm7Q&limit=1`
    request({url, json:true}, (error, resp) =>{    //req to geocod url
        if(error){
            callback('Unable to connect to the geo service', undefined)
        }else if(!resp.body.features[0]){
            callback('Unable to find location', undefined)
        }else{
            
            callback(undefined, {
                latitude : resp.body.features[0].center[1],
                longitude: resp.body.features[0].center[0],
                location: resp.body.features[0].place_name
            })
        }
    })
}   

module.exports = geocode