const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/62d41bf25ebf15b2b46dfa3fb423019d/${latitude},${longitude}?units=si`
    
    if(isNaN(latitude) || Math.abs(latitude) > 90) {
        callback("Invalid latitude.", undefined)
    } else if(isNaN(longitude) || Math.abs(longitude) > 180) {
        callback("Invalid longitude.", undefined)
    } else {
        request({ url, json: true }, (error, { body }) => {
            if(error) {
                callback("Unable to connect to weather service.", undefined)
            } else if(body.error) {
                callback("Unable to get weather data.", undefined)
            } else {
                const { timezone, daily, currently } = body
                const time = new Date(currently.time).toLocaleTimeString('en-GB', { timeZone: timezone })
                const message = `${time} ${daily.data[0].summary}. It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability * 100}% chance of rain.`
                callback(undefined, message)
            }
        })
    }
}

module.exports = forecast
