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
                const time = new Date(daily.data[0].time).toTimeString()
                const timeHi = new Date(daily.data[0].temperatureHighTime).toLocaleTimeString('en-GB', { timeZone: timezone })
                const timeLo = new Date(daily.data[0].temperatureLowTime).toLocaleTimeString('en-GB', { timeZone: timezone })
                let message = `${daily.data[0].summary}.`
                message += ` It is currently ${currently.temperature}C°.`
                message += ` There is ${currently.precipProbability * 100}% chance of rain.`
                message += ` Temperature high of ${daily.data[0].temperatureHigh}C° and low of ${daily.data[0].temperatureLow}C°.`
                callback(undefined, message)
            }
        })
    }
}

module.exports = forecast
